FROM node:21.7.3-alpine3.18
WORKDIR /promotion-web
COPY package.json /promotion-web
RUN npm install
COPY . /promotion-web
CMD ["npm", "run", "start"]