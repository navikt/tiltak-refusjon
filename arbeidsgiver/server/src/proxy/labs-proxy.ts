import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default (router: Router) => {
    router.use(
        '/api',
        (req, res, next) => {
            if (!req.headers.cookie) {
                res.sendStatus(401);
                return;
            }

            const cookies = req.headers.cookie?.split(';');
            const cookieWithFakeToken = cookies?.filter((c) => c.includes('tokenx-token'));
            if (!cookieWithFakeToken.length) {
                res.sendStatus(401);
                return;
            }
            if (cookieWithFakeToken) {
                const accessToken = cookieWithFakeToken[0].split('=')[1];
                req.headers.Authorization = `Bearer ${accessToken}`;
            }
            next();
        },
        createProxyMiddleware({
            target: 'http://tiltak-refusjon-api-labs/api',
            changeOrigin: true,
        })
    );
};
