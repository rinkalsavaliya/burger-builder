FROM node:dubnium

WORKDIR /burger-builder

COPY package.json /burger-builder
RUN npm install

WORKDIR /burger-builder/backend
COPY backend/package.json /burger-builder/backend
RUN npm install

WORKDIR /burger-builder
COPY . /burger-builder
RUN npm run build
WORKDIR /burger-builder/backend

EXPOSE 8080
# build and run with the command :
# docker build . -t burger-builder
# docker run -d -p 3001:3001 --name burger-builder burger-builder
CMD ["npm", "start"]
