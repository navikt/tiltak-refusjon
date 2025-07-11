import { BodyShort, Heading } from '@navikt/ds-react';

import BekreftSlettKorreksjon from '@/refusjon/RefusjonSide/BekreftSlettKorreksjon';
import BekreftTilbakekrevKorreksjon from '@/refusjon/RefusjonSide/BekreftTilbakekrevKorreksjon';
import Boks from '~/Boks';
import InformasjonFraAvtalenVTAO from '~/KvitteringSide/KvitteringSideVTAO/InformasjonFraAvtaleVTAO';
import KorreksjonUtregningVTAO from './KorreksjonUtregningVTAO';
import TilskuddssatsVTAO from '~/KvitteringSide/KvitteringSideVTAO/TilskuddssatsVTAO';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, Refusjonsgrunnlag } from '~/types';

interface Props {
    aktsomhet?: Aktsomhet;
    refusjonsgrunnlag: Refusjonsgrunnlag;
}

const KorreksjonSideVTAO = (props: Props) => {
    const { aktsomhet, refusjonsgrunnlag } = props;
    const { tilskuddsgrunnlag } = refusjonsgrunnlag;

    return (
        <Boks variant="hvit">
            <BekreftSlettKorreksjon />
            <VerticalSpacer rem={2} />
            <Heading size="large" role="heading">
                Korreksjonsutkast VTAO
            </Heading>
            <VerticalSpacer rem={1} />
            <BodyShort size="small">
                Dette er en korreksjon av tidligere utbetalt refusjon. Det beregnes her et foreløpig oppgjør fratrukket
                beløpet som er utbetalt tidligere. Dette er foreløpig et utkast, og den vises ikke for arbeidsgiver før
                den fullføres.
            </BodyShort>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalenVTAO
                aktsomhet={aktsomhet}
                åpnetFørsteGang={'Trengs ikke på korreksjon'}
                refusjonsgrunnlag={refusjonsgrunnlag}
            />
            <VerticalSpacer rem={2} />
            <TilskuddssatsVTAO tilskuddsgrunnlag={tilskuddsgrunnlag} />
            <VerticalSpacer rem={1} />
            <KorreksjonUtregningVTAO tilskuddsgrunnlag={tilskuddsgrunnlag} />
            <VerticalSpacer rem={1} />
            <BekreftTilbakekrevKorreksjon />
        </Boks>
    );
};

export default KorreksjonSideVTAO;
