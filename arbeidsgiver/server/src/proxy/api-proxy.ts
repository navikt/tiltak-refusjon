import { createProxyMiddleware } from 'http-proxy-middleware';
import { Router } from 'express';

import { requestOboToken } from '@/auth/token';

export default (router: Router) => {
    router.use(
        '/api',
        async (req, res, next) => {
            try {
                const accessToken = await requestOboToken(process.env.API_AUDIENCE, req);
                req.headers.authorization = `Bearer ${accessToken}`;
                next();
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        },
        createProxyMiddleware({
            target: process.env.API_URL,
            changeOrigin: true,
            pathRewrite: (_, req) => req.originalUrl,
        })
    );
};
