import { SPORING_ORIGIN } from './config';
import { sladdFnrOgNavIdent } from './sladding';

type AnalyticsPayload = Record<string, unknown> & {
    url?: string;
    referrer?: string;
    origin?: string;
    pageType?: string;
};

export type BeforeSendHandler = (type: string, payload: AnalyticsPayload) => AnalyticsPayload | false;

export function preInnsending(hentSidetype: (pathname: string) => string): BeforeSendHandler {
    return (_type, payload) => {
        return {
            ...payload,
            url: sladdFnrOgNavIdent(payload.url),
            referrer: sladdFnrOgNavIdent(payload.referrer),
            origin: SPORING_ORIGIN,
            pageType: hentSidetype(window.location.pathname),
        };
    };
}
