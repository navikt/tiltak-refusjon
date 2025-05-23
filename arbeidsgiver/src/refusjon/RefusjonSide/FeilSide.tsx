import React, { FunctionComponent, ReactNode } from 'react';
import { useParams } from 'react-router';
import VerticalSpacer from '~/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterPenger } from '~/utils/PengeUtils';
import { Alert, Label, BodyShort, Heading } from '@navikt/ds-react';
import Boks from '~/Boks';
import { tiltakstypeTekst } from '~/types/messages';
import { formatterPeriode } from '~/utils';

type AlertStripeType = 'info' | 'success' | 'warning' | 'error';

type Props = {
    feiltekst: ReactNode;
    advarselType: AlertStripeType;
};

const FeilSide: FunctionComponent<Props> = (props) => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <Boks variant="hvit">
            <Alert variant={props.advarselType}>{props.feiltekst}</Alert>
            <VerticalSpacer rem={2} />
            <Heading level="2" size="large">
                Refusjon for {tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}
            </Heading>
            <VerticalSpacer rem={1} />
            <Label>Periode:</Label>
            <BodyShort size="small">
                {formatterPeriode(
                    refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                    refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                )}
            </BodyShort>
            <VerticalSpacer rem={1} />
            <Label>Beløp i perioden:</Label>
            <BodyShort size="small">
                Inntil {formatterPenger(refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddsbeløp)}
            </BodyShort>
            <VerticalSpacer rem={1} />
            <Label>Deltaker:</Label>
            <BodyShort size="small">{`${refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn} ${refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}`}</BodyShort>
        </Boks>
    );
};

export default FeilSide;
