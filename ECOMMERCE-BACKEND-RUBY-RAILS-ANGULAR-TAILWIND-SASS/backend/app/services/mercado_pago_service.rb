require 'mercadopago'

class MercadoPagoService
  def initialize
    # Usando o token de teste diretamente para garantir que funcione agora
    @sdk = Mercadopago::SDK.new('TEST-2302064569526159-040400-44b5d234ad539f67f9f02efe8faa6252-2381059062')
  end

  def criar_preferencia(pedido)
    preference_data = {
      items: [
        {
          title: "Pedido ##{pedido.id} - ProwayComputers",
          unit_price: pedido.total_price.to_f,
          quantity: 1,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: "http://localhost:4200/sucesso",
        failure: "http://localhost:4200/erro",
        pending: "http://localhost:4200/pendente"
      },
      auto_return: 'approved'
    }

    result = @sdk.preference.create(preference_data)
    
    # Retorna o init_point (link de pagamento) se der certo
    if result[:status] == 201 || result[:status] == 200
      result[:response]['init_point']
    else
      raise "Erro ao criar preferência no Mercado Pago: #{result[:response]}"
    end
  end
end
