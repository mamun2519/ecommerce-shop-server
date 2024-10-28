FROM node:23-alpine3.19
WORKDIR /ecommarce-shop-server
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm" , "start"]