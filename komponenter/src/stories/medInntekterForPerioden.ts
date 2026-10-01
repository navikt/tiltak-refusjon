import type { Inntektsgrunnlag } from '../types/refusjon';

export function medInntekterForPerioden<T extends Omit<Inntektsgrunnlag, 'inntekterForPerioden'>>(
    grunnlag: T
): T & Pick<Inntektsgrunnlag, 'inntekterForPerioden'> {
    return { ...grunnlag, inntekterForPerioden: grunnlag.inntekter };
}
