class Link < ApplicationRecord
  validates :key, :url, presence: true
  validates :key, length: { is: 5 }
end
