require 'rails_helper'

RSpec.describe Links::ShortenUrl, type: :service do
  describe '.run' do
    subject { described_class.run(url) }

    context 'invalid URL' do
      context 'scheme' do
        let(:url) { 'fm://example.radio' }

        it do
          expect(subject.success?).to be false
          expect(subject.meta.status).to eq :bad_request
          expect(subject.data[:error][:message])
            .to eq I18n.t('services.links.shorten_url.errors.invalid_url_scheme')
        end
      end
    end

    context 'valid URL' do
      let(:url) { attributes_for(:link)[:url] }

      it do
        expect(subject.success?).to be true
        expect(subject.meta.status).to eq :created
        expect(subject.data[:original_url]).to eq(url)

        link = Link.first
        expect(subject.data[:shortened_url])
          .to eq("#{Rails.application.credentials.dig(:app_host)}/#{link.key}")
      end
    end
  end
end
