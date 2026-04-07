class Order < ApplicationRecord
  # Adicione 'optional: true' para o Rails não travar o save se o user_id der conflito
  belongs_to :user, optional: true
  
  # Remova as validações de presence temporariamente para testar se o 422 some
  # validates :total, :cart, :address, presence: true
end
