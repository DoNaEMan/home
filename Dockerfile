FROM node:10.15.3-alpine

RUN mkdir -p /var/www/html/
WORKDIR /var/www/html
COPY ./package.json  /var/www/html
RUN npm install
COPY ./ /var/www/html

RUN npm run build

CMD npm start