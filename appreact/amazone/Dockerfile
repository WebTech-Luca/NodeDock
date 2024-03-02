FROM node:18.16.0-alpine3.17
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3003
CMD ["npm", "start"]