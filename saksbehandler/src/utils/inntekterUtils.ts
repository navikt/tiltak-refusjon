import { Inntektsgrunnlag, Inntektslinje } from '~/types/refusjon';

export const sumInntekterOpptjentIPeriode = (inntektsgrunnlag: Inntektsgrunnlag): number =>
    inntektsgrunnlag?.inntekter
        .filter((inntektFraPeriode: Inntektslinje) => inntektFraPeriode.erOpptjentIPeriode)
        .map((inntekt: Inntektslinje) => inntekt.beløp)
        .reduce((previousBeløp, currentBeløp) => previousBeløp + currentBeløp, 0);
