require 'rails_helper'

RSpec.describe Public::LinksController, type: :request do
  describe "GET #show" do
    context 'when link exists' do
      let(:link) { create(:link) }

      it "redirects to the link" do
        get public_link_path(key: link.key)
        expect(response).to have_http_status(301)
      end
    end
  end
end
