import { createProxyMiddleware } from 'http-proxy-middleware';
import { Router } from 'express';

import { apiConfig } from '@/config';
import { requestOboToken, getScopeFromClientId } from '@/auth/token';

export default (router: Router) => {
    const config = apiConfig();
    router.use(
        '/api',
        async (req, res, next) => {
            try {
                const accessToken = await requestOboToken(getScopeFromClientId(config.clientId), req);
                req.headers.authorization = `Bearer ${accessToken}`;
                next();
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        },
        createProxyMiddleware({
            target: config.url,
            changeOrigin: true,
            pathRewrite: (_, req) => req.originalUrl,
        })
    );
};
