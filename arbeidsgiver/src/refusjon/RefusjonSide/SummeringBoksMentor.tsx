import Pengesedler from '@/asset/image/pengesedler.svg?react';
import { Label, BodyShort } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import VerticalSpacer from '~/VerticalSpacer';

import { formatterPenger } from '~/utils/PengeUtils';

import Boks from '~/Boks';
import { Refusjonsgrunnlag, Tilskuddsgrunnlag } from '~/types/refusjon';
import { RefusjonStatus } from '~/types/status';
import { formatterPeriode } from '~/utils';

type Props = {
    refusjonsgrunnlag: Refusjonsgrunnlag;
    status: RefusjonStatus;
    erForKorreksjon: boolean;
};

// Dersom vi vet at dette er siste tilskuddsperiode så vil vi vise alternativ tekst
// som indikerer at man ikke behøver å tilbakebetale beløpet man skylder (med mindre avtale forlenges)
const erSisteTilskuddsperiodeIAvtalen = (tilskuddsgrunnlag: Tilskuddsgrunnlag) =>
    tilskuddsgrunnlag.avtaleTom === tilskuddsgrunnlag.tilskuddTom;

const SummeringBoks: FunctionComponent<Props> = (props) => {
    return (
        <Boks variant="blå">
            <div style={{ margin: 'auto 1.5rem auto 0' }}>
                <Pengesedler />
            </div>
            <div>
                <Label>Dere får utbetalt</Label>
                <VerticalSpacer rem={0.5} />
                <BodyShort size="small">
                    <b>{formatterPenger(25620)}</b> for perioden{' '}
                    {formatterPeriode(
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}{' '}
                    til kontonummer {props.refusjonsgrunnlag.bedriftKontonummer}
                </BodyShort>
            </div>
        </Boks>
    );
};

export default SummeringBoks;
