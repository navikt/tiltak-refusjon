import { InnloggetRolle } from '~/types/brukerContextType';

const erProd = (hostname: string) => /(^|\.)nav\.no$/.test(hostname) && !hostname.endsWith('.dev.nav.no');

const tiltaksgjennomforingHost = (rolle?: InnloggetRolle): string => {
    const prod = erProd(window.location.hostname);
    if (rolle === 'ARBEIDSGIVER') {
        return prod ? 'https://arbeidsgiver.nav.no' : 'https://arbeidsgiver.dev.nav.no';
    }
    return prod ? 'https://tiltaksgjennomforing.intern.nav.no' : 'https://tiltaksgjennomforing.intern.dev.nav.no';
};

export const lagAvtaleLenke = (avtaleId: string, rolle?: InnloggetRolle): string =>
    `${tiltaksgjennomforingHost(rolle)}/tiltaksgjennomforing/avtale/${avtaleId}`;
