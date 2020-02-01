module Api
  module V1
    class LinksController < BaseController
      def create
        result = Links::ShortenUrl.run(link_params)
        status = result.success? ? :created : :bad_request

        render json: result.data, status: status
      end

      private

      def link_params
        params.require(:url)
      end
    end
  end
end
