import { useCallback, useState } from 'react';

export enum Steg {
    FRAVAER = 'FRAVAER',
    INNTEKTER = 'INNTEKTER',
    NULLBELOP = 'NULLBELOP',
    MINUSBELOP = 'MINUSBELOP',
    BEREGNING_OG_BEKREFTELSE = 'BEREGNING_OG_BEKREFTELSE',
}

export enum Seksjon {
    FRAVAER = 'FRAVAER',
    INNTEKT_TABELL = 'INNTEKT_TABELL',
    BRUTTOLONN = 'BRUTTOLONN',
    KID_OG_KONTONUMMER = 'KID_OG_KONTONUMMER',
    UTBETALINGSINFO = 'UTBETALINGSINFO',
    UTREGNING = 'UTREGNING',
    BEKREFTELSE = 'BEKREFTELSE',
}

const initialState: Record<Seksjon, boolean> = {
    [Seksjon.FRAVAER]: true,
    [Seksjon.INNTEKT_TABELL]: false,
    [Seksjon.BRUTTOLONN]: false,
    [Seksjon.KID_OG_KONTONUMMER]: false,
    [Seksjon.UTBETALINGSINFO]: false,
    [Seksjon.UTREGNING]: false,
    [Seksjon.BEKREFTELSE]: false,
};

function useRefusjonssideSteg() {
    const [seksjon, setSeksjon] = useState<Record<Seksjon, boolean>>(initialState);
    const [steg, setSteg] = useState<Steg>(Steg.FRAVAER);

    const endreSteg = useCallback(
        (steg: Steg) => {
            setSteg(steg);

            switch (steg) {
                case Steg.INNTEKTER: {
                    return setSeksjon({
                        ...initialState,
                        [Seksjon.FRAVAER]: true,
                        [Seksjon.INNTEKT_TABELL]: true,
                    });
                }
                case Steg.MINUSBELOP: {
                    return setSeksjon({
                        ...initialState,
                        [Seksjon.FRAVAER]: true,
                        [Seksjon.INNTEKT_TABELL]: true,
                        [Seksjon.UTBETALINGSINFO]: true,
                        [Seksjon.UTREGNING]: true,
                        [Seksjon.BEKREFTELSE]: true,
                    });
                }
                case Steg.NULLBELOP: {
                    return setSeksjon({
                        ...initialState,
                        [Seksjon.FRAVAER]: true,
                        [Seksjon.INNTEKT_TABELL]: true,
                        [Seksjon.UTBETALINGSINFO]: true,
                        [Seksjon.BEKREFTELSE]: true,
                    });
                }
                case Steg.BEREGNING_OG_BEKREFTELSE: {
                    return setSeksjon({
                        ...initialState,
                        [Seksjon.FRAVAER]: true,
                        [Seksjon.INNTEKT_TABELL]: true,
                        [Seksjon.BRUTTOLONN]: true,
                        [Seksjon.KID_OG_KONTONUMMER]: true,
                        [Seksjon.UTBETALINGSINFO]: true,
                        [Seksjon.UTREGNING]: true,
                        [Seksjon.BEKREFTELSE]: true,
                    });
                }
                default: {
                    return setSeksjon(initialState);
                }
            }
        },
        [setSteg, setSeksjon]
    );

    return {
        steg,
        seksjon,
        endreSteg,
    };
}

export default useRefusjonssideSteg;
