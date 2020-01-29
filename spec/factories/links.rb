FactoryBot.define do
  factory :link do
    key { SecureRandom.base36(5) }
    url { 'https://example.com' }
  end
end
