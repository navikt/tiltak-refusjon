import express from 'express';
import compression from 'compression';
import helmet from 'helmet';

import routes from '@/routes';

const server = express();

function start() {
    try {
        server.use(compression());
        server.disable('x-powered-by');
        server.use(helmet({ contentSecurityPolicy: false }));

        server.use('/', routes());

        const port = 3000;
        server.listen(port, () => console.info(`Listening on port ${port}`));
    } catch (error) {
        console.error('Error during start-up', error);
    }
}

start();
