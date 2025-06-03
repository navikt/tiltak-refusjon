FROM node:22-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ENV NODE_EXTRA_CA_CERTS /etc/ssl/ca-bundle.pem

COPY ./arbeidsgiver/server/dist .
COPY ./arbeidsgiver/dist ./build

EXPOSE 3000

ENTRYPOINT ["sh", "-c"]
CMD ["node index.cjs"]
