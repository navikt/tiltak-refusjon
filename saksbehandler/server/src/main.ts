import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import routes from '@/routes';
import { startLabs } from '@/labs';

const server = express();

async function startApp() {
    try {
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));
        server.use(compression());
        server.disable('x-powered-by');

        server.use(
            helmet({
                contentSecurityPolicy: {
                    useDefaults: true,
                    directives: {
                        'default-src': ["'self'", 'wss://*.nav.no', '*.nav.no'],
                        'script-src': ["'self'", '*.nav.no', '*.adeo.no', "'unsafe-inline'"],
                        'style-src': ["'self'", '*.nav.no', '*.adeo.no', "'unsafe-inline'"],
                        'font-src': ["'self'", '*.nav.no', 'data:'],
                        'img-src': ["'self'", '*.nav.no'],
                    },
                },
            })
        );

        // setup routes
        server.use('/', routes());

        const port = 3000;
        server.listen(port, () => console.info(`Listening on port ${port}`));
    } catch (error) {
        console.error('Error during start-up', error);
    }
}

if (process.env.MILJO === 'dev-gcp-labs') {
    startLabs(express()).catch((err) => console.info(err));
} else {
    startApp().catch((err) => console.error(err));
}
