FROM mongo:latest

WORKDIR /usr/src/app

COPY . .

EXPOSE 27017:27017
