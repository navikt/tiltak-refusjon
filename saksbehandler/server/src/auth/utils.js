const config = require('../config');
const logger = require('../logger');

const getOnBehalfOfAccessToken = (authClient, tokenEndpoint, req, scope) => {
    return new Promise((resolve, reject) => {
        const apiConfig = config.api();
        const token = req.headers.authorization.replace('Bearer', '').trim();
        authClient
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

const appendDefaultScope = (scope) => `${scope}/.default`;

const formatClientIdScopeForV2Clients = (clientId) => appendDefaultScope(`api://${clientId}`);

module.exports = {
    getOnBehalfOfAccessToken,
    appendDefaultScope,
};
