import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjonsgrunnlag } from '../refusjon';
import { BodyShort, Label } from '@navikt/ds-react';
import sumBy from 'lodash.sumby';
import InntekterKunFraTiltaketSvar from './InntekterKunFraTiltaketSvar';

const HarTattStillingTilAlleInntektsLinjerGammel: FunctionComponent<{ refusjonsgrunnlag: Refusjonsgrunnlag }> = (props) => {
    if (!props.refusjonsgrunnlag.inntektsgrunnlag) {
        return null;
    }

    const inntekterHuketAvForOpptjentIPeriode = props.refusjonsgrunnlag.inntektsgrunnlag!!.inntekter.filter(
        (inntekt) => inntekt.erOpptjentIPeriode
    );
    const sumInntekterOpptjentIPeriode = sumBy(inntekterHuketAvForOpptjentIPeriode, 'beløp');

    return (
        <div>
            <Label>
                Er inntektene som vi har hentet ({formatterPenger(sumInntekterOpptjentIPeriode)}) kun fra tiltaket{' '}
                {tiltakstypeTekst[props.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}?{' '}
            </Label>
            <InntekterKunFraTiltaketSvar inntekterKunFraTiltaket={props.refusjonsgrunnlag.inntekterKunFraTiltaket}/>
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

export default HarTattStillingTilAlleInntektsLinjerGammel;
