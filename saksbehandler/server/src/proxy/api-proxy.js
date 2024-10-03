const proxy = require('express-http-proxy');
const jwt = require('jsonwebtoken');
const authUtils = require('../auth/utils');
const config = require('../config');
const NodeCache = require('node-cache');

const setup = (router, authClient, tokenEndpoint) => {
    const oboTokenCache = new NodeCache({ stdTTL: 60 });
    router.use(
        '/api',
        proxy(config.api().url, {
            proxyReqPathResolver: (req) => {
                return req.originalUrl;
            },
            proxyReqOptDecorator: (options, req) => {
                return new Promise((resolve, reject) => {
                    // Sjekk om vi har en gyldig token i cachen
                    const tokenFraAzure = req.headers.authorization.replace('Bearer', '').trim();

                    const oboTokenFraCache = oboTokenCache.get(tokenFraAzure);
                    if (oboTokenFraCache) {
                        const decodedOboTokenFraCache = jwt.decode(oboTokenFraCache, { complete: true });
                        if (
                            decodedOboTokenFraCache &&
                            decodedOboTokenFraCache.payload.exp - 60 > new Date().getTime() / 1000
                        ) {
                            options.headers.Authorization = `Bearer ${oboTokenFraCache}`;
                            resolve(options);
                            return;
                        }
                    }
                    oboTokenCache.del(tokenFraAzure);
                    authUtils.getOnBehalfOfAccessToken(authClient, tokenEndpoint, req).then(
                        (access_token) => {
                            options.headers.Authorization = `Bearer ${access_token}`;
                            oboTokenCache.set(tokenFraAzure, access_token, 60);
                            resolve(options);
                        },
                        (error) => reject(error)
                    );
                });
            },
        })
    );
};

module.exports = { setup };
