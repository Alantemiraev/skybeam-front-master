FROM node:18-alpine

WORKDIR /srv

RUN apk update && apk upgrade

COPY . /srv

ARG NUXT_PUBLIC_API_HOST='/api'
ENV NUXT_PUBLIC_API_HOST=${NUXT_PUBLIC_API_HOST}

RUN npm i
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "run", "preview" ]
