# install dependencies
FROM node:dubnium AS dependencies

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=dependencies /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
RUN ls
EXPOSE 3000
ENTRYPOINT ["nginx","-g","daemon off;"]
