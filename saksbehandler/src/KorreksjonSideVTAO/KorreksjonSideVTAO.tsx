import { BodyShort, Heading } from '@navikt/ds-react';

import BekreftSlettKorreksjon from '../refusjon/RefusjonSide/BekreftSlettKorreksjon';
import { Refusjonsgrunnlag } from '~/types/refusjon';
import Boks from '~/Boks';
import InformasjonFraAvtalenVTAO from '~/KvitteringSide/KvitteringSideVTAO/InformasjonFraAvtaleVTAO';
import TilskuddssatsVTAO from '~/KvitteringSide/KvitteringSideVTAO/TilskuddssatsVTAO';
import BekreftTilbakekrevKorreksjon from '@/refusjon/RefusjonSide/BekreftTilbakekrevKorreksjon';
import VerticalSpacer from '~/VerticalSpacer';
import KorreksjonUtregningVTAO from './KorreksjonUtregningVTAO';
import { useRefusjonKreverAktsomhet } from '@/services/rest-service';

type Props = {
    refusjonId: string;
    refusjonsgrunnlag: Refusjonsgrunnlag;
};

const KorreksjonSideVTAO = (props: Props) => {
    const { refusjonId, refusjonsgrunnlag } = props;
    const { bedriftKontonummer, tilskuddsgrunnlag } = refusjonsgrunnlag;
    const { data: aktsomhet } = useRefusjonKreverAktsomhet(refusjonId);

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
                tilskuddsgrunnlag={tilskuddsgrunnlag}
                bedriftKontonummer={bedriftKontonummer}
                åpnetFørsteGang={'Trengs ikke på korreksjon'}
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
