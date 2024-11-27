FROM node:21.7.3-alpine3.18
WORKDIR /pro-react-admin
COPY package.json /pro-react-admin
RUN yarn install
COPY . /pro-react-admin
CMD ["yarn", "run", "start"]