FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY server/package*.json ./server/
COPY server/admin-panel/package*.json ./server/admin-panel/

RUN npm install && \
    cd server && npm install && \
    cd admin-panel && npm install

COPY . .

RUN cd server/admin-panel && npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY server/package*.json ./server/

RUN npm install --only=production && \
    cd server && npm install --only=production

COPY --from=builder /app .
COPY --from=builder /app/server/admin-panel/dist ./server/admin-panel/dist

EXPOSE 3000 8080

CMD ["sh", "-c", "npm run serve & cd server && npm run dev"]