import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Droplets, Flame, Plus, Minus, Users } from 'lucide-react';

const ITEMS = [
  { key: 'electric', label: '전기', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { key: 'water', label: '수도', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  { key: 'gas', label: '가스', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
] as const;

export default function BillSplitPage() {
  const [amounts, setAmounts] = useState({ electric: '', water: '', gas: '' });
  const [people, setPeople] = useState(2);
  const [copied, setCopied] = useState(false);

  const total = Object.values(amounts).reduce((sum, v) => sum + (parseInt(v.replace(/,/g, '')) || 0), 0);
  const perPerson = total > 0 ? Math.ceil(total / people) : 0;

  const handleAmount = (key: string, raw: string) => {
    const num = raw.replace(/[^0-9]/g, '');
    setAmounts(prev => ({ ...prev, [key]: num ? parseInt(num).toLocaleString('ko-KR') : '' }));
  };

  const handleRequest = () => {
    if (perPerson === 0) return;
    // supertoss 딥링크: 금액만 채우고 토스 앱에서 청구
    const url = `supertoss://send?amount=${perPerson}`;
    window.location.href = url;
  };

  const handleCopy = async () => {
    if (perPerson === 0) return;
    await navigator.clipboard.writeText(`공과금 정산 1인당 ${perPerson.toLocaleString('ko-KR')}원 (총 ${total.toLocaleString('ko-KR')}원 / ${people}명)`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white px-5 pt-12 pb-5 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">공과금 N빵</h1>
        <p className="text-sm text-gray-500 mt-1">전기·수도·가스를 인원수로 나눠요</p>
      </div>

      <div className="flex-1 px-5 py-5 space-y-3">
        {/* 공과금 입력 */}
        <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">이번 달 공과금</p>
          {ITEMS.map(({ key, label, icon: Icon, color, bg }) => (
            <div key={key} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <span className="w-12 text-sm font-medium text-gray-700">{label}</span>
              <div className="flex-1 relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={amounts[key as keyof typeof amounts]}
                  onChange={e => handleAmount(key, e.target.value)}
                  className="w-full text-right pr-8 py-2 bg-gray-50 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">원</span>
              </div>
            </div>
          ))}
        </div>

        {/* 인원 설정 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users size={20} className="text-blue-500" />
              </div>
              <span className="text-sm font-semibold text-gray-700">인원</span>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setPeople(p => Math.max(2, p - 1))}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <Minus size={16} className="text-gray-600" />
              </motion.button>
              <span className="text-xl font-bold text-gray-900 w-6 text-center">{people}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setPeople(p => Math.min(10, p + 1))}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <Plus size={16} className="text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* 결과 */}
        {total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-600 rounded-2xl p-5 text-white shadow-md"
          >
            <p className="text-blue-200 text-sm mb-1">1인당 납부금액</p>
            <p className="text-4xl font-bold">{perPerson.toLocaleString('ko-KR')}원</p>
            <p className="text-blue-300 text-xs mt-2">
              총 {total.toLocaleString('ko-KR')}원 ÷ {people}명 (올림 적용)
            </p>
          </motion.div>
        )}

        {total === 0 && (
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <p className="text-gray-400 text-sm">금액을 입력하면 1인당 금액이 계산돼요</p>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="px-5 pb-8 pt-3 space-y-2 bg-gray-50">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleRequest}
          disabled={perPerson === 0}
          className="w-full py-4 rounded-2xl text-white font-bold text-base disabled:opacity-40"
          style={{ backgroundColor: '#3182F6' }}
        >
          토스로 청구하기
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleCopy}
          disabled={perPerson === 0}
          className="w-full py-3 rounded-2xl font-semibold text-sm text-blue-600 bg-blue-50 disabled:opacity-40"
        >
          {copied ? '✓ 복사됨' : '금액 텍스트 복사'}
        </motion.button>
      </div>
    </div>
  );
}
