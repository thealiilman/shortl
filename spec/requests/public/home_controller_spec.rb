require 'rails_helper'

RSpec.describe Public::HomeController, type: :request do
  describe "GET #index" do
    it "successfuly shows the index page" do
      get public_root_path
      expect(response).to have_http_status(200)
    end
  end
end
