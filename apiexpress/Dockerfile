FROM node:18.16.0-alpine3.17
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3002
CMD ["npm", "start"]
ENTRYPOINT [ "node","server.js" ]