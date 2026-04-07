# Estágio de Desenvolvimento
FROM node:20-slim

# Instala dependências necessárias para ferramentas de build (SASS/Tailwind)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia arquivos de configuração primeiro para cache de camadas
COPY package*.json ./
COPY tsconfig*.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Instala dependências (Isolado no container)
RUN npm install

# Copia o restante do código (src, public, angular.json)
COPY . .

# Expõe a porta do Angular
EXPOSE 4200

# Comando para rodar com Proxy (para falar com o Rails) e Polling (para o Disco D)
# O --proxy-config usa o seu arquivo proxy.conf.json que já mapeamos
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--proxy-config", "proxy.conf.json", "--poll", "2000"]