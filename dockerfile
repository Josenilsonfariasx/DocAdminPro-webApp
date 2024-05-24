# Etapa 1: Construção
FROM node:20-alpine AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos package.json e package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código-fonte para o contêiner
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa 2: Execução
FROM nginx:alpine

# Copiar os arquivos de build do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar a configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
