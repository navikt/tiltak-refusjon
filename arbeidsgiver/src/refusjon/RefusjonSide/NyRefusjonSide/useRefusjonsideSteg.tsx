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

const initalState: Record<Seksjon, boolean> = {
    [Seksjon.FRAVAER]: true,
    [Seksjon.INNTEKT_TABELL]: false,
    [Seksjon.BRUTTOLONN]: false,
    [Seksjon.KID_OG_KONTONUMMER]: false,
    [Seksjon.UTBETALINGSINFO]: false,
    [Seksjon.UTREGNING]: false,
    [Seksjon.BEKREFTELSE]: false,
};

function useRefusjonssideSteg() {
    const [seksjon, setSeksjon] = useState<Record<Seksjon, boolean>>(initalState);

    const endreSteg = useCallback(
        (steg: Steg) => {
            switch (steg) {
                case Steg.INNTEKTER: {
                    return setSeksjon({
                        ...initalState,
                        [Seksjon.FRAVAER]: true,
                        [Seksjon.INNTEKT_TABELL]: true,
                    });
                }
                case Steg.MINUSBELOP: {
                    return setSeksjon({
                        ...initalState,
                        [Seksjon.FRAVAER]: true,
                        [Seksjon.INNTEKT_TABELL]: true,
                        [Seksjon.UTBETALINGSINFO]: true,
                        [Seksjon.UTREGNING]: true,
                        [Seksjon.BEKREFTELSE]: true,
                    });
                }
                case Steg.NULLBELOP: {
                    return setSeksjon({
                        ...initalState,
                        [Seksjon.FRAVAER]: true,
                        [Seksjon.INNTEKT_TABELL]: true,
                        [Seksjon.UTBETALINGSINFO]: true,
                        [Seksjon.BEKREFTELSE]: true,
                    });
                }
                case Steg.BEREGNING_OG_BEKREFTELSE: {
                    return setSeksjon({
                        ...initalState,
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
                    return setSeksjon(initalState);
                }
            }
        },
        [setSeksjon]
    );

    return {
        seksjon,
        endreSteg,
    };
}

export default useRefusjonssideSteg;
