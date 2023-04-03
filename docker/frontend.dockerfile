# Dockerfile for React client

# Build react client
FROM node:18

ARG PORT

RUN mkdir -p /app

WORKDIR /app

COPY ./client/package.json ./client/package.json
COPY ./env/frontend.env ./env/frontend.env

WORKDIR /app/client

# Install dependencies

RUN npm install

# Expose frontend port
EXPOSE ${PORT}