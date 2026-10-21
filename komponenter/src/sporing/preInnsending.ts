import { SPORING_ORIGIN } from './config';
import { sladdFnrOgNavIdent } from './sladding';

type AnalyticsPayload = Record<string, unknown> & {
    url?: string;
    referrer?: string;
    data?: Record<string, unknown>;
};

export type SporingRolle = 'saksbehandler' | 'arbeidsgiver';

export type BeforeSendHandler = (type: string, payload: AnalyticsPayload) => AnalyticsPayload | false;

export function preInnsending(hentSidetype: (pathname: string) => string, rolle: SporingRolle): BeforeSendHandler {
    return (_type, payload) => {
        return {
            ...payload,
            url: sladdFnrOgNavIdent(payload.url),
            referrer: sladdFnrOgNavIdent(payload.referrer),
            data: {
                ...payload.data,
                origin: SPORING_ORIGIN,
                pageType: hentSidetype(window.location.pathname),
                role: rolle,
            },
        };
    };
}
