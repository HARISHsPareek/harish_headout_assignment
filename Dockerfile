FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

RUN npm install --only=production


EXPOSE 8080


ENV NODE_OPTIONS="--max-old-space-size=1500"
ENV CPU_LIMIT="2"


CMD ["node", "./dist/index.js"]
