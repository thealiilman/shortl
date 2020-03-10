class Public::LinksController < Public::BaseController
  def show
    link = Link.find_by key: params[:key]

    redirect_to link.url, status: :moved_permanently
  end
end
