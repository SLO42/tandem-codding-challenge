
FROM node:12.18.3-buster-slim

WORKDIR /opt

ADD app /opt/app
WORKDIR /opt/app
RUN npm install

CMD npm start