import { Label, BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '~/VerticalSpacer';
import { formatterPenger } from '~/utils/PengeUtils';
import { Refusjonsgrunnlag } from '~/types/refusjon';
import { tiltakstypeTekst } from '~/types/messages';

type Props = {
    refusjonsgrunnlag: Refusjonsgrunnlag;
};

// DENNE KOMPONENTEN SKAL KUN BRUKES TIL VISNING AV KVITTERINGER PÅ REFUSJONER SOM ER SENDT INN FØR SPØRSMÅL OM INNTEKTSLINJE ER OPPTJENT I PERIODEN
const InntekterFraTiltaketSvar: FunctionComponent<Props> = (props) => {
    if (
        props.refusjonsgrunnlag.inntekterKunFraTiltaket === null ||
        props.refusjonsgrunnlag.inntekterKunFraTiltaket === undefined
    ) {
        return null;
    }

    return (
        <div>
            <Label>
                Er inntektene som vi har hentet (
                {formatterPenger(props.refusjonsgrunnlag.inntektsgrunnlag!.bruttoLønn)}) kun fra tiltaket{' '}
                {tiltakstypeTekst[props.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}?{' '}
            </Label>
            <BodyShort size="small">{props.refusjonsgrunnlag.inntekterKunFraTiltaket ? 'Ja' : 'Nei'}</BodyShort>
            {props.refusjonsgrunnlag.endretBruttoLønn !== null &&
                props.refusjonsgrunnlag.endretBruttoLønn !== undefined && (
                    <>
                        <VerticalSpacer rem={1} />
                        <Label>Korrigert bruttolønn:</Label>
                        <BodyShort size="small">{formatterPenger(props.refusjonsgrunnlag.endretBruttoLønn)}</BodyShort>
                    </>
                )}
        </div>
    );
};

export default InntekterFraTiltaketSvar;
