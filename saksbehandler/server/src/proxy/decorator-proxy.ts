import { createProxyMiddleware } from 'http-proxy-middleware';
import { Router } from 'express';

import * as config from '../config';
import { getOnBehalfOfAccessToken } from '../auth/utils';
import { TokenEndpoint, Client } from '../auth/azure';

export default (router: Router, authClient: Client, tokenEndpoint: TokenEndpoint) => {
    router.use(
        '/modiacontextholder',
        async (req, res, next) => {
            try {
                const accessToken = await getOnBehalfOfAccessToken(
                    authClient,
                    tokenEndpoint,
                    req,
                    config.envVar({ name: 'MODIA_CONTEXT_HOLDER_SCOPE', required: false })
                );
                req.headers.authorization = `Bearer ${accessToken}`;
                next();
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        },
        createProxyMiddleware({
            target: 'http://modiacontextholder.personoversikt',
            followRedirects: false,
            changeOrigin: true,
        })
    );

    router.use('/internarbeidsflatedecorator', (req, res) => {
        res.redirect(config.decorator().host + req.originalUrl.replace('/internarbeidsflatedecorator', ''));
    });
};
