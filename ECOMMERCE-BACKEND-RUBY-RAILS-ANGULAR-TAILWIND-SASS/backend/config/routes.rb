Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :checkouts do
        member do
          post :force_sucess
        end

        collection do
          post :webhook        # Este continua sendo para o Mercado Pago
          post :paypal_webhook # NOVO: Rota específica para o PayPal
        end
      end

      # Mantendo sua rota de backup do MP
      post 'payments/webhook', to: 'checkouts#webhook'
    end
  end
end