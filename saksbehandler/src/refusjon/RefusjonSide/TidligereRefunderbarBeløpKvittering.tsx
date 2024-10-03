import React, { FunctionComponent, PropsWithChildren } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import BEMHelper from '../../utils/bem';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjonsgrunnlag } from '../refusjon';
import { BodyShort, Heading, Label } from '@navikt/ds-react';

interface Properties {
    refusjonsgrunnlag: Refusjonsgrunnlag;
}

const TidligereRefunderbarBeløpKvittering: FunctionComponent<Properties> = ({
    refusjonsgrunnlag,
}: PropsWithChildren<Properties>) => {
    const cls = BEMHelper('refusjonside');
    if (refusjonsgrunnlag.fratrekkRefunderbarBeløp) {
        return (
            <div className={cls.element('fratrekk-sykepenger')}>
                <Heading size="small" className={cls.element('fratrekk-sykepenger-tittel')}>
                    Fravær i perioden
                </Heading>
                {refusjonsgrunnlag.fratrekkRefunderbarBeløp && refusjonsgrunnlag.beregning && (
                    <>
                        <Label>
                            Har deltaker har hatt fravær med lønn som blir refundert av NAV i denne perioden?{' '}
                        </Label>
                        <Label>Ja</Label>
                        <VerticalSpacer rem={1} />
                        <BodyShort size="small">
                            Har dere fått utbetalt refusjon av lønn på grunn av fravær for deltaker, for eksempel
                            refusjon av sykepenger, så skal dette beløpet trekkes fra refusjon om{' '}
                            {tiltakstypeTekst[refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}. Beløpet som skal
                            trekkes fra er det beløpet dere har fått i refusjon av NAV.
                        </BodyShort>
                        <VerticalSpacer rem={1} />
                        <Label>
                            Refusjonsbeløpet på grunn av fravær:{' '}
                            {formatterPenger(refusjonsgrunnlag.beregning?.tidligereRefundertBeløp)}
                        </Label>
                    </>
                )}
            </div>
        );
    }
    return null;
};

export default TidligereRefunderbarBeløpKvittering;
