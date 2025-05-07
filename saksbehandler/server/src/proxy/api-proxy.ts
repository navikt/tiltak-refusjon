import proxy from 'express-http-proxy';
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import NodeCache from 'node-cache';
import { Router } from 'express';

import * as config from '../config';
import { getOnBehalfOfAccessToken } from '../auth/utils';
import { TokenEndpoint, Client } from '../auth/azure';

const getExp = (jwt: Jwt | null) => {
    const payload = jwt?.payload as JwtPayload;
    return payload && 'exp' in payload ? (payload.exp ?? 0) : 0;
};

export default (router: Router, authClient: Client, tokenEndpoint: TokenEndpoint) => {
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
                    const tokenFraAzure = req.headers?.authorization?.replace('Bearer', '').trim() ?? '';
                    const oboTokenFraCache = oboTokenCache.get<string>(tokenFraAzure);
                    if (oboTokenFraCache) {
                        const decodedOboTokenFraCache = jwt.decode(oboTokenFraCache, { complete: true });
                        if (
                            decodedOboTokenFraCache &&
                            getExp(decodedOboTokenFraCache) - 60 > new Date().getTime() / 1000
                        ) {
                            if (options.headers) {
                                options.headers.Authorization = `Bearer ${oboTokenFraCache}`;
                            }
                            resolve(options);
                            return;
                        }
                    }
                    oboTokenCache.del(tokenFraAzure);
                    getOnBehalfOfAccessToken(authClient, tokenEndpoint, req).then(
                        (access_token) => {
                            if (options.headers) {
                                options.headers.Authorization = `Bearer ${access_token}`;
                            }
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
