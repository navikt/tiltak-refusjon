import express from 'express';
import path from 'path';

import apiProxy from '@/proxy/api-proxy';
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

    router.get('/login', (_, res) => {
        res.redirect('/oauth2/login');
    });
    router.get('/logout', (_, res) => {
        res.redirect('/oauth2/logout');
    });

    router.use(async (req, res, next) => {
        if (!req.headers.authorization) {
            console.log('Mangler authorization header');
            res.sendStatus(401);
        } else if (await isTokenValid(req)) {
            console.log('Token er gyldig');
            next();
        } else {
            console.log('Token er ugyldig');
            res.redirect('/login');
        }
    });

    apiProxy(router);
    decoratorProxy(router);

    // serve static files
    router.use(express.static(path.join(__dirname, '../build')));

    router.get('/{*splat}', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    });

    return router;
};
