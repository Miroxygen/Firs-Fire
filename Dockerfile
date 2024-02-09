FROM node:20.8.0-bookworm-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p /var/log/lit-service
RUN chown -R node:node /var/log/lit-service

USER node

EXPOSE 8081

CMD [ "node", "src/index.js"]
