FactoryBot.define do
  factory :link do
    key { SecureRandom.alphanumeric(5) }
    url { 'https://example.com' }
  end
end
