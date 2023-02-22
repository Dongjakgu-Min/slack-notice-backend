FROM node:lts-alpine
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN apk add openssl1.1-compat
RUN npm install
RUN npm install -g @prisma/client
RUN npx prisma generate
RUN npm run build
ENTRYPOINT ["node", "dist/main"]

