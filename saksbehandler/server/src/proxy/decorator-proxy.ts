import { createProxyMiddleware } from 'http-proxy-middleware';
import { Router } from 'express';

import { decoratorConfig } from '@/config';
import { requestOboToken } from '@/auth/token';

export default (router: Router, mock = false) => {
    const config = decoratorConfig();

    if (mock) {
        router.use('/modiacontextholder', (req, res) => {
            res.status(200).json({
                saksbehandler: {
                    ident: 'X123456',
                    fornavn: 'Vidar',
                    etternavn: 'Veileder',
                    navn: 'Vidar Veileder',
                },
                enheter: [{ enhetId: '1234', navn: 'Nav Tiltak' }],
                ident: 'X123456',
                fornavn: 'Vidar',
                etternavn: 'Veileder',
                navn: 'Vidar Veileder',
            });
        });
    } else {
        router.use(
            '/modiacontextholder',
            async (req, res, next) => {
                try {
                    const accessToken = await requestOboToken(config.modiaContextHolderScope, req);
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
    }

    router.use('/internarbeidsflatedecorator', (req, res) => {
        res.redirect(config.host + req.originalUrl.replace('/internarbeidsflatedecorator', ''));
    });
};
