# check_db_config.rb

puts "=== Ambiente atual ==="
puts Rails.env

puts "\n=== Arquivo database.yml existe? ==="
puts File.exist?(Rails.root.join("config", "database.yml"))

puts "\n=== Configurações carregadas ==="
puts ActiveRecord::Base.configurations.to_h.inspect

puts "\n=== Configuração para development ==="
puts ActiveRecord::Base.configurations.configs_for(env_name: "development").inspect
