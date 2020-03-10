require 'rails_helper'

describe Api::V1::LinksController, type: :request do
  path '/links' do
    post 'Generates a shortened URL' do
      tags 'Links'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :url, in: :query, type: :string, required: true

      response '201', 'returns a response with a status of created' do
        let(:url) { 'https://ali-ilman.com' }

        run_test!
      end

      response '400', 'returns a response with a status of bad_request' do
        let(:url) { 'fm://oasis.radio' }

        run_test!
      end
    end
  end
end
