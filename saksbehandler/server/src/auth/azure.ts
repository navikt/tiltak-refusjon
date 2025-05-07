import { BaseClient, custom, Issuer } from 'openid-client';
import jwksClient from 'jwks-rsa';

import * as config from '../config';
import httpProxy from '../proxy/http-proxy';
import logger from '../logger';

export const client = async () => {
    const azureAdConfig = config.azureAd();
    const httpProxyAgent = httpProxy();
    if (httpProxyAgent) {
        custom.setHttpOptionsDefaults({
            agent: httpProxyAgent,
        });
    }
    const issuer = await Issuer.discover(azureAdConfig.discoveryUrl);
    logger.info(`Discovered issuer ${issuer.issuer}`);
    const jwks = JSON.parse(azureAdConfig.clientJwks);
    return new issuer.Client(
        {
            client_id: azureAdConfig.clientId,
            redirect_uris: [azureAdConfig.redirectUri],
            token_endpoint_auth_method: 'private_key_jwt',
            token_endpoint_auth_signing_alg: 'RS256',
        },
        jwks
    );
};

export type Client = BaseClient;

export const azureJwksClient = () => {
    const azureAdConfig = config.azureAd();
    return jwksClient({
        jwksUri: azureAdConfig.openIdJwksUri,
    });
};

export type JwksClient = ReturnType<typeof azureJwksClient>;

export const azureTokenEndpoint = async () => {
    const issuer = await Issuer.discover(process.env.AZURE_APP_WELL_KNOWN_URL ?? '');
    return issuer.token_endpoint;
};

export type TokenEndpoint = unknown;
