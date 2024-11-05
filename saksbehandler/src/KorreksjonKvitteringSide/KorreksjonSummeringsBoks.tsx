import Pengesedler from '@/asset/image/pengesedler.svg?react';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import { formatterPenger } from '../utils/PengeUtils';
import { BodyShort, Label } from '@navikt/ds-react';
import { Refusjonsgrunnlag } from '~/types/refusjon';
import { formatterPeriode } from '~/utils';
import Boks from '~/Boks';

const KorreksjonSummeringBoks: FunctionComponent<{ refusjonsgrunnlag: Refusjonsgrunnlag }> = ({
    refusjonsgrunnlag,
}) => {
    return (
        <Boks variant="blå">
            <div style={{ paddingRight: '1.5rem' }}>
                <Pengesedler />
            </div>
            <div>
                {refusjonsgrunnlag.beregning?.refusjonsbeløp != null &&
                    refusjonsgrunnlag.beregning?.refusjonsbeløp < 0 && (
                        <>
                            <VerticalSpacer rem={0.5} />
                            <BodyShort size="small">
                                Dere skylder{' '}
                                <b>{formatterPenger(Math.abs(refusjonsgrunnlag.beregning?.refusjonsbeløp || 0))}</b> for
                                perioden{' '}
                                {formatterPeriode(
                                    refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                                    refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                                )}{' '}
                                Beløpet vil tilbakekreves.
                            </BodyShort>
                        </>
                    )}
                {refusjonsgrunnlag.beregning?.refusjonsbeløp != null &&
                    refusjonsgrunnlag.beregning?.refusjonsbeløp >= 0 && (
                        <>
                            <Label>Dere får utbetalt</Label>
                            <VerticalSpacer rem={0.5} />
                            <BodyShort size="small">
                                <b>{formatterPenger(refusjonsgrunnlag.beregning?.refusjonsbeløp || 0)}</b> for perioden{' '}
                                {formatterPeriode(
                                    refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                                    refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                                )}{' '}
                                til kontonummer {refusjonsgrunnlag.bedriftKontonummer}
                            </BodyShort>
                        </>
                    )}
            </div>
        </Boks>
    );
};

export default KorreksjonSummeringBoks;
