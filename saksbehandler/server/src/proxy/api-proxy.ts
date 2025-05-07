import { createProxyMiddleware } from 'http-proxy-middleware';
import { Router } from 'express';

import { apiConfig } from '@/config';
import { requestOboToken, getScopeFromClientId } from '@/auth/token';

export default (router: Router) => {
    router.use(
        '/api',
        async (req, res, next) => {
            try {
                const accessToken = await requestOboToken(getScopeFromClientId(apiConfig.clientId), req);
                req.headers.authorization = `Bearer ${accessToken}`;
                next();
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        },
        createProxyMiddleware({
            target: apiConfig.url,
            changeOrigin: true,
            pathRewrite: (_, req) => req.originalUrl,
        })
    );
};
