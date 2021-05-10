FROM node:14.15.0-alpine3.11

WORKDIR /home/node/proveedores-front

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN npm install && npm install @vue/cli-service
COPY . .
CMD ["npm", "run", "serve"]

