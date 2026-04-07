require 'mercadopago'

module Api
  module V1
    class CheckoutsController < ApplicationController
      skip_before_action :verify_authenticity_token

      # GET: Listar pedidos (Lupa/Dashboard)
      def index
        @pedidos = Order.all.order(created_at: :desc)
        render json: @pedidos
      end

      # POST: Criar Pedido (Checkout)
      def create
        @pedido = Order.new(checkout_params)
        @pedido.user_id = 1 if @pedido.user_id.nil?
        @pedido.status ||= 'pendente'

        if @pedido.save
          if @pedido.payment == 'mercadopago'
            # 🚀 DICA: Se for usar produção, troque o Token aqui!
            token = 'TEST-2302064569526159-040400-44b5d234ad539f67f9f02efe8faa6252-2381059062' 
            sdk = Mercadopago::SDK.new(token)

            preference_data = {
              "items" => [
                {
                  "title" => "Pedido ##{@pedido.id} - ProwayComputers",
                  "unit_price" => @pedido.total.to_f,
                  "quantity" => 1,
                  "currency_id" => "BRL"
                }
              ],
              "payer" => {
                "email" => @pedido.emailCliente.presence || "test_user_123@testuser.com"
              }
            }

            preference_response = sdk.preference.create(preference_data)
            url_mp = preference_response[:response]['init_point']

            if url_mp
              @pedido.update_columns(url_pagamento: url_mp)
              render json: { 
                id: @pedido.id, 
                url_pagamento: url_mp, 
                status: @pedido.status,
                rastreio: "PW-#{SecureRandom.hex(4).upcase}" 
              }, status: :created
            else
              render json: { error: "Erro MP", details: preference_response[:response] }, status: :bad_request
            end

          elsif @pedido.payment == 'pix'
            # 🚀 RETORNO PARA O PIX
            render json: { 
              id: @pedido.id, 
              status: @pedido.status,
              pix_copia_e_cola: "00020126360014BR.GOV.BCB.PIX0114+5511999999999520400005303986540510.005802BR5915ProwayComputers6009SAO PAULO62070503***6304E2CA",
              rastreio: "PW-#{SecureRandom.hex(4).upcase}"
            }, status: :created
          else
            render json: @pedido, status: :created
          end
        else
          render json: @pedido.errors, status: :unprocessable_entity
        end
      end

      # PUT: Atualizar Status (O Lápis)
      def update
        @pedido = Order.find_by(id: params[:id])
        if @pedido
          novo_status = params.dig(:checkout, :status) || params[:status]
          if @pedido.update(status: novo_status)
            render json: { message: "Status atualizado!", pedido: @pedido }, status: :ok
          else
            render json: { error: "Erro ao salvar" }, status: :unprocessable_entity
          end
        else
          render json: { error: "Pedido não encontrado" }, status: :not_found
        end
      end

      # DELETE: Excluir Pedido (A Lixeira)
      def destroy
        @pedido = Order.find_by(id: params[:id])
        if @pedido
          @pedido.destroy
          render json: { message: "Pedido ##{params[:id]} removido" }, status: :ok
        else
          render json: { error: "Pedido não encontrado" }, status: :not_found
        end
      end

      private

      def checkout_params
        params.require(:checkout).permit(:total, :user_id, :status, :emailCliente, :address, :cart, :delivery, :payment, :url_pagamento)
      end
    end
  end
end