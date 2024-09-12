# Basierend auf einer Node.js-Runtime
FROM node:18-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Quellcode kopieren
COPY . .

# Startbefehl
CMD [ "node", "index.js" ]