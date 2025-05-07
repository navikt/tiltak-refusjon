import express from 'express';
import path from 'path';

import apiProxy from '@/proxy/api-proxy';
import labsProxy from '@/proxy/labs-proxy';
import decoratorProxy from '@/proxy/decorator-proxy';
import { isTokenValid } from '@/auth/token';

const router = express.Router();

export default () => {
    // Unprotected
    router.get('/isAlive', (_, res) => {
        res.status(200).send('Alive');
    });
    router.get('/isReady', (_, res) => {
        res.status(200).send('Ready');
    });

    if (process.env.MILJO === 'dev-gcp-labs') {
        router.use('/logout', (_, res) => {
            res.clearCookie('aad-token');
            res.redirect('/');
        });

        labsProxy(router);
    } else {
        router.get('/login', (_, res) => {
            res.redirect('/oauth2/login');
        });
        router.get('/logout', (_, res) => {
            res.redirect('/oauth2/logout');
        });

        router.use(async (req, res, next) => {
            if (!req.headers.authorization) {
                res.sendStatus(401);
            } else if (await isTokenValid(req)) {
                next();
            } else {
                res.redirect('/login');
            }
        });

        apiProxy(router);
    }

    decoratorProxy(router, process.env.MILJO === 'dev-gcp-labs');

    router.use(express.static(path.join(__dirname, '../build')));

    router.get('/{*splat}', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    });

    return router;
};
