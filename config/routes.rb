# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api, constraints: { format: :json } do
    namespace :v1 do
      resources :links, only: :create
    end
  end

  namespace :public, path: '/' do
    root 'home#index'

    get ':key', to: 'links#show', as: :link
  end
end
