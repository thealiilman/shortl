module Links
  class ShortenUrl
    attr_reader :url

    def initialize(url)
      @url = url
    end

    def self.run(url)
      new(url).run
    end

    def run
      return error_body unless valid_url_scheme?

      generate_link_and_return_success_body
    end

    private

    def valid_url_scheme?
      uri = URI.parse(url)
      %w[http https mailto].include?(uri.scheme)
    end

    def generate_link_and_return_success_body
      link = Link.create(key: key, url: url)

      OpenStruct.new(
        success?: true,
        data: {
          original_url: url,
          shortened_url: "#{Rails.application.credentials.dig(:app_host)}/#{link.key}"
        }
      )
    end

    def error_body
      OpenStruct.new(
        success?: false,
        data: {
          error: {
            message: I18n.t('services.links.shorten_url.errors.invalid_url_scheme')
          }
        }
      )
    end

    def key
      SecureRandom.alphanumeric(5)
    end
  end
end
