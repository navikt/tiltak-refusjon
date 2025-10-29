import { Inntektsgrunnlag } from '~/types/refusjon';
export const formatterPenger = (penger = 0) =>
    `${penger < 0 ? '– ' : ''}${new Intl.NumberFormat('nb-NO', {
        signDisplay: 'never',
        style: 'decimal',
        maximumFractionDigits: 2,
    }).format(penger)} kr`;

export const summerInntektsgrunnlag = (inntektsgrunnlag?: Inntektsgrunnlag) =>
    inntektsgrunnlag ? inntektsgrunnlag.inntekter.map((ilinje) => ilinje.beløp).reduce((a, b) => a + b, 0) : 0;

export const visTallMedNorskFormatering = (tall: number) => tall.toLocaleString('no-NB');
