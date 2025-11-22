FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY admin-panel/package*.json ./admin-panel/
RUN cd admin-panel && npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dev"]