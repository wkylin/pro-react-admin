FROM node:alpine
WORKDIR /promotion-web
COPY package.json /promotion-web
RUN yarn install
COPY . /promotion-web
CMD ["yarn", "run", "start"]