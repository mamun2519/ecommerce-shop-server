FROM node:23-alpine3.19
WORKDIR /smart-eshop-backend
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]