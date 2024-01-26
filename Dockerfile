FROM node:20


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY index.js .
COPY newcontroller.js .


COPY tmp/data /usr/src/app/tmp/data


EXPOSE 8080


ENV NODE_OPTIONS="--max-old-space-size=1500"
ENV CPU_LIMIT="2"


CMD ["node", "index.js"]
