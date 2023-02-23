### STAGE 1: Build ###
FROM node:12.13.1-alpine AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.19-alpine
###COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/task-tracker-web-ui /usr/share/nginx/html