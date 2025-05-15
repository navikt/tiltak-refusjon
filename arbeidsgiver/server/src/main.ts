import express, { Handler } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr';

import routes from '@/routes';

const server = express();

const eksternCspMiddleware = (): Handler => {
    let csp: string;

    return async (_, res, next) => {
        if (!csp) {
            csp = await buildCspHeader({}, { env: process.env.MILJO === 'prod-gcp' ? 'prod' : 'dev' });
        }
        res.setHeader('Content-Security-Policy', csp);
        next();
    };
};

function start() {
    try {
        server.use(compression());
        server.disable('x-powered-by');
        server.use(helmet({ contentSecurityPolicy: false }));
        server.use(eksternCspMiddleware());

        server.use('/', routes());

        const port = 3000;
        server.listen(port, () => console.info(`Listening on port ${port}`));
    } catch (error) {
        console.error('Error during start-up', error);
    }
}

start();
