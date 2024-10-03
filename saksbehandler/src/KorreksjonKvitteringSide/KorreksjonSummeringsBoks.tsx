import Pengesedler from '@/asset/image/pengesedler.svg?react';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import { formatterPeriode } from '../utils/datoUtils';
import { formatterPenger } from '../utils/PengeUtils';
import { Korreksjon, Refusjonsgrunnlag } from '../refusjon/refusjon';
import { BodyShort, Label } from '@navikt/ds-react';

const Boks = styled.div`
    display: flex;
    flex-direction: row;
    border: 3px solid #cce1f3;
    border-radius: 4px;
    padding: 1.75rem;
`;

type Props = {
    korreksjon: Korreksjon;
    refusjonsgrunnlag: Refusjonsgrunnlag;
};

const KorreksjonSummeringBoks: FunctionComponent<Props> = (props) => {
    return (
        <Boks>
            <div style={{ paddingRight: '1.5rem' }}>
                <Pengesedler />
            </div>
            <div>
                {props.refusjonsgrunnlag.beregning?.refusjonsbeløp != null &&
                    props.refusjonsgrunnlag.beregning?.refusjonsbeløp < 0 && (
                        <>
                            <VerticalSpacer rem={0.5} />
                            <BodyShort size="small">
                                Dere skylder{' '}
                                <b>{formatterPenger(Math.abs(props.refusjonsgrunnlag.beregning?.refusjonsbeløp || 0))}</b>
                                {' '}for perioden{' '} 
                                 {formatterPeriode(
                                    props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                                    props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                                )}{' '}
                                Beløpet vil tilbakekreves.
                            </BodyShort>
                        </>
                    )}
                {props.refusjonsgrunnlag.beregning?.refusjonsbeløp != null &&
                    props.refusjonsgrunnlag.beregning?.refusjonsbeløp >= 0 && (
                        <>
                            <Label>Dere får utbetalt</Label>
                            <VerticalSpacer rem={0.5} />
                            <BodyShort size="small">
                                <b>{formatterPenger(props.refusjonsgrunnlag.beregning?.refusjonsbeløp || 0)}</b> for
                                perioden{' '}
                                {formatterPeriode(
                                    props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                                    props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                                )}{' '}
                                til kontonummer {props.refusjonsgrunnlag.bedriftKontonummer}
                            </BodyShort>
                        </>
                    )}
            </div>
        </Boks>
    );
};

export default KorreksjonSummeringBoks;
