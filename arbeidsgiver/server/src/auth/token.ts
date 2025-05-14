import * as oasis from '@navikt/oasis';
import { IncomingMessage } from 'http';

export const isTokenValid = async (req: IncomingMessage) => {
    const token = oasis.getToken(req);
    if (!token) {
        return false;
    }
    const validation = await oasis.validateToken(token);
    return validation.ok;
};

export const requestOboToken = async (audience: string, req: IncomingMessage) => {
    const token = oasis.getToken(req);
    if (!token) {
        throw Error('Missing token in req');
    }

    const validation = await oasis.validateToken(token);
    if (!validation.ok) {
        throw validation.error;
    }

    const obo = await oasis.requestOboToken(token, audience);
    if (!obo.ok) {
        throw obo.error;
    }

    return obo.token;
};
