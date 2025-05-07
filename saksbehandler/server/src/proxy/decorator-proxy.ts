import { createProxyMiddleware } from 'http-proxy-middleware';
import { Router } from 'express';

import { decoratorConfig } from '@/config';
import { requestOboToken } from '@/auth/token';

export default (router: Router) => {
    router.use(
        '/modiacontextholder',
        async (req, res, next) => {
            try {
                const accessToken = await requestOboToken(decoratorConfig.modiaContextHolderScope, req);
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
        res.redirect(decoratorConfig.host + req.originalUrl.replace('/internarbeidsflatedecorator', ''));
    });
};
