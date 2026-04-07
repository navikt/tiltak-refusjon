FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

COPY ./arbeidsgiver/server/dist .
COPY ./arbeidsgiver/dist /build

ENV TZ="Europe/Oslo"
EXPOSE 3000

ENTRYPOINT ["node", "index.cjs"]
