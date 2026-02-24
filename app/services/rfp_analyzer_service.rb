# frozen_string_literal: true

require 'gemini-ai'

# RFP (Request for Proposal) 분석 서비스
# Gemini 2.0 Flash를 사용하여 공고서를 자동 분석합니다
class RfpAnalyzerService
  def initialize(bidding)
    @bidding = bidding
    @client = Gemini.new(
      credentials: {
        service: 'generative-language-api',
        api_key: ENV['GOOGLE_GENERATIVE_AI_API_KEY']
      },
      options: { model: 'gemini-2.0-flash-exp', server_sent_events: true }
    )
  end

  # 공고서 자동 분석 (텍스트 기반)
  def analyze
    return { error: '공고서 설명이 없습니다' } if @bidding.description.blank?

    prompt = build_analysis_prompt

    begin
      result = @client.stream_generate_content({
        contents: { role: 'user', parts: { text: prompt } }
      })

      analysis_text = extract_text_from_stream(result)
      parse_and_save_analysis(analysis_text)

      { success: true, analysis: analysis_text }
    rescue StandardError => e
      { error: e.message }
    end
  end

  # 첨부된 문서 이미지 분석 (멀티모달)
  def analyze_with_images
    return { error: '첨부된 문서가 없습니다' } if @bidding.documents.blank?

    # 첫 번째 문서의 이미지를 base64로 변환
    document = @bidding.documents.first
    image_data = document.download
    base64_image = Base64.strict_encode64(image_data)

    prompt = build_image_analysis_prompt

    begin
      result = @client.stream_generate_content({
        contents: {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: document.content_type,
                data: base64_image
              }
            }
          ]
        }
      })

      analysis_text = extract_text_from_stream(result)
      parse_and_save_analysis(analysis_text)

      { success: true, analysis: analysis_text }
    rescue StandardError => e
      { error: e.message }
    end
  end

  private

  def build_analysis_prompt
    <<~PROMPT
      당신은 입찰 제안서 작성 전문가입니다. 다음 공고서를 분석하여 핵심 정보를 추출해주세요.

      **공고서 내용:**
      #{@bidding.description}

      **발주처:** #{@bidding.agency}
      **예산:** #{@bidding.budget}
      **사업 기간:** #{@bidding.application_period}

      다음 항목을 JSON 형식으로 추출해주세요:

      {
        "kpis": ["KPI 1", "KPI 2", "KPI 3"],
        "required_tasks": ["필수 과업 1", "필수 과업 2", "필수 과업 3"],
        "winning_strategies": ["차별화 전략 1", "차별화 전략 2", "차별화 전략 3"],
        "target_metrics": {
          "visitors": "예상 방문객 수",
          "budget_impact": "예산 대비 기대 효과",
          "social_reach": "SNS 도달 목표"
        }
      }

      JSON만 출력하고, 추가 설명은 하지 마세요.
    PROMPT
  end

  def build_image_analysis_prompt
    <<~PROMPT
      당신은 입찰 공고서 이미지를 분석하는 전문가입니다.
      첨부된 공고서 이미지에서 다음 정보를 추출해주세요:

      1. 사업명
      2. 발주처
      3. 예산 규모
      4. 사업 기간
      5. 핵심 과업 (3-5개)
      6. 평가 기준
      7. 제출 서류

      JSON 형식으로 출력해주세요.
    PROMPT
  end

  def extract_text_from_stream(result)
    text = ''
    result.each do |event|
      if event.dig('candidates', 0, 'content', 'parts')
        event.dig('candidates', 0, 'content', 'parts').each do |part|
          text += part['text'] if part['text']
        end
      end
    end
    text
  end

  def parse_and_save_analysis(analysis_text)
    # JSON 파싱 시도
    begin
      data = JSON.parse(analysis_text)

      # analysis_notes에 KPI + 필수 과업 저장
      notes = "## 핵심 KPI\n"
      data['kpis']&.each_with_index do |kpi, i|
        notes += "#{i + 1}. #{kpi}\n"
      end

      notes += "\n## 필수 과업\n"
      data['required_tasks']&.each do |task|
        notes += "- #{task}\n"
      end

      # winning_strategy에 차별화 전략 저장
      strategies = ""
      data['winning_strategies']&.each_with_index do |strategy, i|
        strategies += "**전략 #{i + 1}**: #{strategy}\n\n"
      end

      @bidding.update(
        analysis_notes: notes,
        winning_strategy: strategies
      )
    rescue JSON::ParserError
      # JSON 파싱 실패 시 원문 그대로 저장
      @bidding.update(analysis_notes: analysis_text)
    end
  end
end
