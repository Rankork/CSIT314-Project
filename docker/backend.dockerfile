# Dockerfile for Express backend

FROM node:18

ARG PORT

RUN mkdir -p /app

WORKDIR /app

COPY ./backend/package.json ./backend/package.json
COPY ./env/backend.env ./env/backend.env

WORKDIR /app/backend

# Install dependencies

RUN npm install -g nodemon
RUN npm install

# Expose backend port
EXPOSE ${PORT}