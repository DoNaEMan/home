FROM node:10.15.3-alpine

RUN npm cache clean --force

RUN mkdir -p /root/app

WORKDIR /root/app

COPY ./package.json  /root/app

RUN npm install --production --verbose

COPY ./ /root/app

RUN npm run build

CMD npm start