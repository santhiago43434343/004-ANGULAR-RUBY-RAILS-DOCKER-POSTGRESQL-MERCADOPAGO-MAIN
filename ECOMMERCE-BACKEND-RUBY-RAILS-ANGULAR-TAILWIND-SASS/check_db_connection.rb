# check_db_connection.rb

begin
  # Rails já inicializa o ambiente automaticamente quando você usa rails runner
  ActiveRecord::Base.establish_connection(:development)
  puts "Conectado ao banco: #{ActiveRecord::Base.connection.current_database}"
rescue => e
  puts "Erro de conexão: #{e.message}"
end
