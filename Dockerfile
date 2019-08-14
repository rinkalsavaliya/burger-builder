# install dependencies
FROM node:dubnium AS dependencies

ARG API_URL
ENV REACT_APP_API_URL=$API_URL
ARG API_KEY
ENV REACT_APP_API_KEY=$API_KEY

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN npm run build

FROM nginx:1.15.2-alpine

COPY --from=dependencies /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000

ENTRYPOINT ["nginx","-g","daemon off;"]