FROM node:22.15.1
WORKDIR /pro-react-admin
COPY package.json /pro-react-admin
RUN npm install
COPY . /pro-react-admin
CMD ["npm", "run", "build:production"]