module Api
  module V1
    class LinksController < BaseController
      def create
        result = Links::ShortenUrl.run(link_params)

        render json: result.data, status: result.meta.status
      end

      private

      def link_params
        params.require(:url)
      end
    end
  end
end
