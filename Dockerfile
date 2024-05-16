FROM node:21.7.3-alpine3.18
WORKDIR /promotion-web
COPY package.json /promotion-web
RUN yarn install
COPY . /promotion-web
CMD ["yarn", "run", "start"]