import { BodyShort, Heading } from '@navikt/ds-react';

import BekreftSlettKorreksjon from '@/refusjon/RefusjonSide/BekreftSlettKorreksjon';
import BekreftTilbakekrevKorreksjon from '@/refusjon/RefusjonSide/BekreftTilbakekrevKorreksjon';
import Boks from '~/Boks';
import InformasjonFraAvtalenVTAO from '~/KvitteringSide/KvitteringSideVTAO/InformasjonFraAvtaleVTAO';
import TilskuddssatsVTAO from '~/KvitteringSide/KvitteringSideVTAO/TilskuddssatsVTAO';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, Korreksjon } from '~/types';
import { MainContainer } from '~/Container';
import Utregning from '~/Utregning';

interface Props {
    aktsomhet?: Aktsomhet;
    korreksjon: Korreksjon;
}

const KorreksjonSideVTAO = (props: Props) => {
    const { aktsomhet, korreksjon } = props;

    return (
        <MainContainer rolle="saksbehandler">
            <Boks variant="hvit">
                <BekreftSlettKorreksjon />
                <VerticalSpacer rem={2} />
                <Heading size="large" role="heading">
                    Korreksjonsutkast VTAO
                </Heading>
                <VerticalSpacer rem={1} />
                <BodyShort size="small">
                    Dette er en korreksjon av tidligere utbetalt refusjon. Det beregnes her et foreløpig oppgjør
                    fratrukket beløpet som er utbetalt tidligere. Dette er foreløpig et utkast, og den vises ikke for
                    arbeidsgiver før den fullføres.
                </BodyShort>
                <VerticalSpacer rem={2} />
                <InformasjonFraAvtalenVTAO
                    aktsomhet={aktsomhet}
                    åpnetFørsteGang={'Trengs ikke på korreksjon'}
                    refusjonsgrunnlag={korreksjon.refusjonsgrunnlag}
                />
                <VerticalSpacer rem={2} />
                <TilskuddssatsVTAO tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag} />
                <VerticalSpacer rem={1} />
                <Utregning tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag} utregning={korreksjon.utregning} />
                <VerticalSpacer rem={1} />
                <BekreftTilbakekrevKorreksjon />
            </Boks>
        </MainContainer>
    );
};

export default KorreksjonSideVTAO;
