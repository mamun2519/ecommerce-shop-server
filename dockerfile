FROM node:22-alpine

WORKDIR "/smart-eshop"

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]