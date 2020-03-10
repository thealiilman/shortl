require 'rails_helper'

RSpec.describe Link, type: :model do
  describe 'validations' do
    it do
      should validate_presence_of(:key)
      should validate_presence_of(:url)
      should validate_length_of(:key).is_equal_to(5)
    end
  end
end
