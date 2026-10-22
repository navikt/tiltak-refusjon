import { useCallback, useEffect, useState } from 'react';
import { Refusjon } from '~/types';

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
    [Seksjon.FRAVAER]: false,
    [Seksjon.INNTEKT_TABELL]: false,
    [Seksjon.BRUTTOLONN]: false,
    [Seksjon.KID_OG_KONTONUMMER]: false,
    [Seksjon.UTBETALINGSINFO]: false,
    [Seksjon.UTREGNING]: false,
    [Seksjon.BEKREFTELSE]: false,
};

function useRefusjonssideSteg(refusjon: Refusjon) {
    const {
        refusjonsgrunnlag: { inntektsgrunnlag },
    } = refusjon;
    const [steg, setSteg] = useState<Steg>();
    const [seksjon, setSeksjon] = useState<Record<Seksjon, boolean>>(initialState);
    const manglerInntekter = inntektsgrunnlag?.inntekterForPerioden.length === 0;

    const endreSteg = useCallback(
        (steg: Steg) => {
            setSteg(steg);

            switch (steg) {
                case Steg.FRAVAER:
                    return setSeksjon({
                        ...initialState,
                        [Seksjon.FRAVAER]: true,
                    });
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
                    return manglerInntekter
                        ? setSeksjon({
                              ...initialState,
                              [Seksjon.BEKREFTELSE]: true,
                          })
                        : setSeksjon({
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
        [setSteg, setSeksjon, manglerInntekter]
    );

    useEffect(() => {
        endreSteg(manglerInntekter ? Steg.NULLBELOP : Steg.FRAVAER);
    }, [endreSteg, manglerInntekter]);

    return {
        steg,
        seksjon,
        endreSteg,
    };
}

export default useRefusjonssideSteg;
