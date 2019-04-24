FROM node:10.15.3-alpine

WORKDIR /root/app

COPY ./package.json /root/app/

RUN npm install --verbose

COPY ./ /root/app

RUN npm run build

CMD npm start