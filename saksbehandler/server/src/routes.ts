import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';

import apiProxy from './proxy/api-proxy';
import decoratorProxy from './proxy/decorator-proxy';
import { Client, JwksClient, TokenEndpoint } from './auth/azure';

const router = express.Router();

const ensureAuthenticated =
    (azureJwksClient: JwksClient) => async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers['authorization']) {
            const bearerToken = req.headers.authorization?.replace('Bearer', '').trim();
            const decoded = jwt.decode(bearerToken, { complete: true });
            if (decoded) {
                const verifyOptions: jwt.VerifyOptions = {
                    algorithms: ['RS256'],
                };
                const key = await azureJwksClient.getSigningKey(decoded.header.kid);
                const signingKey = key.getPublicKey();
                jwt.verify(bearerToken, signingKey, verifyOptions, (error) => {
                    if (!error) {
                        next();
                    } else {
                        res.redirect('/login');
                    }
                });
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    };

export default (authClient: Client, tokenEndpoint: TokenEndpoint, azureJwksClient: JwksClient) => {
    // Unprotected
    router.get('/isAlive', (req, res) => res.send('Alive'));
    router.get('/isReady', (req, res) => res.send('Ready'));

    router.get('/login', (req, res) => res.redirect('/oauth2/login'));
    router.get('/logout', (req, res) => res.redirect('oauth2/logout'));

    router.use(ensureAuthenticated(azureJwksClient));

    apiProxy(router, authClient, tokenEndpoint);
    decoratorProxy(router, authClient, tokenEndpoint);

    // serve static files
    router.use(express.static(path.join(__dirname, '../build')));

    router.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    });

    return router;
};
