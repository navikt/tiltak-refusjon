import { Label } from '@navikt/ds-react';
import { formatterPenger } from '@/utils/PengeUtils';
import { FunctionComponent } from 'react';
import { Refusjonsgrunnlag } from '../refusjon';
import { formatterPeriode } from '@/utils/datoUtils';
import { tiltakstypeTekst } from '@/messages';

interface Props {
    refusjonsgrunnlag: Refusjonsgrunnlag;
}

const InntekterFraTiltaketSvarNyLabel:FunctionComponent<Props> = ({refusjonsgrunnlag}) => {

    const refusjonNummer = `${refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr}-${refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer}`;
    const valgtBruttoLønn = refusjonsgrunnlag.inntektsgrunnlag?.inntekter.filter((inntekt) =>
     inntekt.erOpptjentIPeriode).map((el) => el.beløp).reduce((el, el2) => el + el2, 0);

     const periode = formatterPeriode(
        refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
        refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom,
        'DD.MM'
    );

  return (
    <Label>
        Er inntektene du har huket av ({formatterPenger(valgtBruttoLønn as number)})
        tilknyttet refusjonssnummer {refusjonNummer} <br />
        for perioden {periode} for tiltaket{' '}
        {tiltakstypeTekst[refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}?
    </Label>
  );
}
export default InntekterFraTiltaketSvarNyLabel;
