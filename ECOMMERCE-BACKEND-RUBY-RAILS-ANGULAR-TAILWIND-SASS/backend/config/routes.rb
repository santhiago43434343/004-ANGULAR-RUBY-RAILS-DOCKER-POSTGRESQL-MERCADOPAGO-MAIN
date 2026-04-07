Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :checkouts # Isso cria as rotas automáticas (GET, POST, etc)
    end
  end
end
