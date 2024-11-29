FROM node:22.11.0
WORKDIR /pro-react-admin
COPY package.json /pro-react-admin
RUN yarn install
COPY . /pro-react-admin
CMD ["yarn", "run", "build:production"]