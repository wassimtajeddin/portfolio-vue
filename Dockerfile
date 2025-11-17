FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY server/package*.json ./server/
COPY server/admin-panel/package*.json ./server/admin-panel/

RUN npm install
RUN cd server && npm install
RUN cd server/admin-panel && npm install

COPY . .

RUN cd server/admin-panel && npm run build

EXPOSE 3000 8080

CMD ["sh", "-c", "npm run serve & cd server && npm install && npm run build && npm run dev"]