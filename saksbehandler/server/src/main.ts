import express from 'express';

import routes from '@/routes';

const server = express();

function startApp() {
    try {
        server.disable('x-powered-by');

        // setup routes
        server.use('/', routes());

        const port = 3000;
        server.listen(port, () => console.info(`Listening on port ${port}`));
    } catch (error) {
        console.error('Error during start-up', error);
    }
}

startApp();
