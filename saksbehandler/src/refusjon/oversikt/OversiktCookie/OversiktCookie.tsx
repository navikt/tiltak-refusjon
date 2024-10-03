import { useCookies } from 'react-cookie';
import { Filter } from '../FilterContext';

enum CookieName {
    TILTAK_REFUSJON_OVERSIKTTREFF = 'tiltak-refusjon-Oversikttreff',
}

const genererExpires = (): Date => {
    const date = new Date();
    date.setTime(date.getTime() + 30 * 60 * 1000);
    return date;
};

export const useOversiktCookie = () => {
    const [cookies, setCookie] = useCookies();
    const oversiktTreffCookie = cookies[CookieName.TILTAK_REFUSJON_OVERSIKTTREFF];
    const oppdatereSokeVerdiCookie = (sokeverdi: Partial<Filter>) => {
        setCookie(
            CookieName.TILTAK_REFUSJON_OVERSIKTTREFF,
            { ...sokeverdi },
            {
                path: '/',
                expires: genererExpires(),
            }
        );
    };
    return { oversiktTreffCookie, oppdatereSokeVerdiCookie };
};
