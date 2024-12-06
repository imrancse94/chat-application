FROM node:21-alpine as frontend
WORKDIR /app/frontend
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build