require 'rails_helper'

describe Api::V1::LinksController, type: :request do
  path '/links' do
    post 'Generates a shortened URL' do
      tags 'Links'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :url, in: :query, type: :string, required: true

      response '201', 'returns body for successful shortening' do
        let(:url) { 'https://ali-ilman.com' }

        run_test! do
          data = JSON.parse(body).deep_symbolize_keys
          link = Link.first

          expect(data[:original_url]).to eq(url)
          expect(data[:shortened_url]).to eq("#{request.domain}/#{link.key}")
        end
      end

      response '400', 'returns error for unsuccessful shortening' do
        let(:url) { 'fm://oasis.radio' }

        run_test! do
          data = JSON.parse(body).deep_symbolize_keys
          link = Link.first

          expect(data[:error][:message])
            .to eq(I18n.t('services.links.shorten_url.errors.invalid_url_scheme'))
        end
      end
    end
  end
end
