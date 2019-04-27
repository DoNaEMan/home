FROM node:10.15.3-alpine

RUN npm cache clean --force

RUN mkdir -p /var/www/html/

WORKDIR /var/www/html

COPY ./package.json  /var/www/html/

RUN npm install --production --verbose

COPY ./ /var/www/html

RUN npm run build

CMD ["npm", "start"]