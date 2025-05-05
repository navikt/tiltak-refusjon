import { Request } from 'express';

import * as config from '../config';
import logger from '../logger';

import { TokenEndpoint, Client } from './azure';

const appendDefaultScope = (scope: string) => `${scope}/.default`;

const formatClientIdScopeForV2Clients = (clientId: string) => appendDefaultScope(`api://${clientId}`);

export const getOnBehalfOfAccessToken = (
    client: Client,
    tokenEndpoint: TokenEndpoint,
    req: Request,
    scope?: string
) => {
    return new Promise((resolve, reject) => {
        const apiConfig = config.api();
        const token = req.headers.authorization?.replace('Bearer', '').trim();
        client
            .grant(
                {
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                    requested_token_use: 'on_behalf_of',
                    scope: scope ?? formatClientIdScopeForV2Clients(apiConfig.clientId),
                    assertion: token,
                },
                {
                    clientAssertionPayload: {
                        aud: [tokenEndpoint],
                    },
                }
            )
            .then((tokenSet) => {
                resolve(tokenSet.access_token);
            })
            .catch((err) => {
                logger.error(err);
                reject(err);
            });
    });
};
