import express from 'express';

import * as azure from './auth/azure';
import routes from './routes';
import cors from './cors';
import logger from './logger';
import { startLabs } from './labs';

const server = express();

async function startApp() {
    try {
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // setup sane defaults for CORS and HTTP headers
        // server.use(helmet());
        server.use(cors());

        const azureAuthClient = await azure.client();
        const tokenEndpoint = await azure.azureTokenEndpoint();
        const azureJwksClient = azure.azureJwksClient();

        // setup routes
        server.use('/', routes(azureAuthClient, tokenEndpoint, azureJwksClient));

        const port = 3000;
        server.listen(port, () => logger.info(`Listening on port ${port}`));
    } catch (error) {
        logger.error('Error during start-up', error);
    }
}

if (process.env.MILJO === 'dev-gcp-labs') {
    startLabs(express()).catch((err) => logger.info(err));
} else {
    startApp().catch((err) => logger.error(err));
}
