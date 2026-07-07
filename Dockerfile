FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG WF01_URL
ENV WF01_URL=$WF01_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]