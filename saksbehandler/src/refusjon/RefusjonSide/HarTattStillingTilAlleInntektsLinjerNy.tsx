import React, { FunctionComponent } from 'react';
import VerticalSpacer from '~/VerticalSpacer';

import InntekterFraTiltaketSvarNyLabel from './HarTattStillingTilAlleInnteksLinjerNyLabel';
import InntekterKunFraTiltaketSvar from './InntekterKunFraTiltaketSvar';
import InntekterOpptjentIPeriodeTabell from './InntekterOpptjentIPeriodeTabell';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { Refusjonsgrunnlag } from '~/types/refusjon';
import { formatterPenger } from '@/utils/PengeUtils';
import { formatterPeriode, månedsNavn } from '~/utils';

import styles from './InntekterFraTiltaketSpørsmål.module.less';

type Props = {
    refusjonsgrunnlag: Refusjonsgrunnlag;
    harTattStillingTilAlleInntektslinjer?: boolean;
};

const HarTattStillingTilAlleInntektsLinjerNy: FunctionComponent<Props> = (props) => {
    if (
        props.harTattStillingTilAlleInntektslinjer === false &&
        (props.refusjonsgrunnlag.inntekterKunFraTiltaket === null ||
            props.refusjonsgrunnlag.inntekterKunFraTiltaket === undefined)
    ) {
        return null;
    }

    if (!props.refusjonsgrunnlag.inntektsgrunnlag?.inntekter) {
        return null;
    }

    const månedNavn = månedsNavn(props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom);

    return (
        <div>
            <div className={styles.gronnBoks}>
                <Heading size="small">
                    Inntekter som refunderes for{' '}
                    {formatterPeriode(
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}
                </Heading>
                <VerticalSpacer rem={1} />
                <InntekterOpptjentIPeriodeTabell
                    inntekter={props.refusjonsgrunnlag.inntektsgrunnlag.inntekter}
                    månedsNavn={månedNavn}
                />
                <VerticalSpacer rem={2} />
                <InntekterFraTiltaketSvarNyLabel refusjonsgrunnlag={props.refusjonsgrunnlag} />
                <InntekterKunFraTiltaketSvar
                    inntekterKunFraTiltaket={props.refusjonsgrunnlag.inntekterKunFraTiltaket}
                />
                {props.refusjonsgrunnlag.endretBruttoLønn !== null &&
                    props.refusjonsgrunnlag.endretBruttoLønn !== undefined && (
                        <>
                            <VerticalSpacer rem={1} />
                            <Label>Korrigert bruttolønn:</Label>
                            <BodyShort size="small">
                                {formatterPenger(props.refusjonsgrunnlag.endretBruttoLønn)}
                            </BodyShort>
                        </>
                    )}
            </div>
        </div>
    );
};

export default HarTattStillingTilAlleInntektsLinjerNy;
