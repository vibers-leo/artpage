class PortfolioItem < ApplicationRecord
  belongs_to :profile

  validates :image_url, presence: true

  default_scope { order(position: :asc) }
end
