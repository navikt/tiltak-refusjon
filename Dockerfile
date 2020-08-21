FROM navikt/node-express:12.2.0
WORKDIR /app
RUN yarn add http-proxy-middleware@0.21.0 mustache-express jsdom promise

COPY build/ build/
COPY src/server/ src/server/
COPY src/paths.json src/paths.json
COPY start.sh ./

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
