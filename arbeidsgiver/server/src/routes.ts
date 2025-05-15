import express from 'express';
import path from 'path';

import apiProxy from '@/proxy/api-proxy';
import decoratorProxy from '@/proxy/decorator-proxy';
import navDekorator from '@/dekorator/nav-dekoratoren';
import { isTokenValid } from '@/auth/token';

const router = express.Router();

export default () => {
    const isLabs = process.env.MILJO === 'dev-gcp-labs';
    router.get('/isAlive', (_, res) => {
        res.status(200).send('Alive');
    });
    router.get('/isReady', (_, res) => {
        res.status(200).send('Ready');
    });

    if (isLabs) {
        router.use('/logout', (req, res) => {
            res.clearCookie('tokenx-token');
            res.redirect('/');
        });
    } else {
        router.use(async (req, res, next) => {
            if (req.headers.authorization && (await isTokenValid(req))) {
                next();
            } else {
                res.redirect('/login');
            }
        });

        apiProxy(router);
    }

    decoratorProxy(router, isLabs);

    router.use(express.static(path.join(__dirname, '../build')));
    router.get('/{*splat}', navDekorator(path.resolve(__dirname, '../build', 'index.html')));

    return router;
};
