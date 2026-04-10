class AnalyticsLog < ApplicationRecord
  belongs_to :profile
  belongs_to :link, optional: true
end
