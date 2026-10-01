import { Inntektslinje } from '~/types';

export type Inntektsendring =
    | { type: 'INGEN-INNTEKTER' }
    | { type: 'INNTEKT'; id: string; erOpptjentIPeriode: boolean };

export const erInntektLike = (a: Inntektslinje[], b: Inntektslinje[]): boolean =>
    a.length === b.length && a.every((inntekt, index) => inntekt.id === b[index].id);

export const harOpptjentInntekterIPerioden = (inntekter: Inntektslinje[]): boolean =>
    inntekter.some((inntekt) => inntekt.erOpptjentIPeriode);

export const oppdaterInntektslinjeOpptjentIPeriode = (
    inntekter: Inntektslinje[],
    endring: Inntektsendring
): Inntektslinje[] =>
    inntekter.map((linje) => {
        const { type } = endring;
        if (type === 'INNTEKT' && linje.id === endring.id) {
            return { ...linje, erOpptjentIPeriode: endring.erOpptjentIPeriode };
        }
        if (type === 'INGEN-INNTEKTER' || typeof linje.erOpptjentIPeriode !== 'boolean') {
            return { ...linje, erOpptjentIPeriode: false };
        }
        return linje;
    });
