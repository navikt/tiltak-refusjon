import express from 'express';
import path from 'path';

import apiProxy from '@/proxy/api-proxy';
import labsProxy from '@/proxy/labs-proxy';
import navDekorator from '@/dekorator/nav-dekoratoren';
import { isTokenValid } from '@/auth/token';

const router = express.Router();

export default () => {
    router.get('/isAlive', (_, res) => {
        res.status(200).send('Alive');
    });
    router.get('/isReady', (_, res) => {
        res.status(200).send('Ready');
    });

    if (process.env.MILJO === 'dev-gcp-labs') {
        router.use('/logout', (req, res) => {
            res.clearCookie('tokenx-token');
            res.redirect('/');
        });

        labsProxy(router);
    } else {
        router.use(['/refusjon', '/refusjon/{*splat}'], async (req, res, next) => {
            if (req.headers.authorization && (await isTokenValid(req))) {
                next();
            } else {
                res.sendStatus(401);
            }
        });

        apiProxy(router);
    }

    router.get('/', navDekorator(path.resolve(__dirname, '../build', 'index.html')));
    router.use(express.static(path.join(__dirname, '../build')));
    router.get('/{*splat}', navDekorator(path.resolve(__dirname, '../build', 'index.html')));

    return router;
};
