FROM node:10.15.3-alpine

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

COPY ./package.json  /var/www/html

COPY ./ /var/www/html

RUN npm install core-js@3

RUN npm install

RUN npm run build

CMD npm start