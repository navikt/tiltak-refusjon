import { BodyShort, Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import BekreftSlettKorreksjon from '../refusjon/RefusjonSide/BekreftSlettKorreksjon';
import { Korreksjon, Refusjon } from '~/types/refusjon';
import Boks from '~/Boks';
import InformasjonFraAvtalenVTAO from '~/KvitteringSide/KvitteringSideVTAO/InformasjonFraAvtaleVTAO';
import TilskuddssatsVTAO from '~/KvitteringSide/KvitteringSideVTAO/TilskuddssatsVTAO';
import KorreksjonUtregningVTAO from '@/refusjon/RefusjonSide/KorreksjonUtregningVTAO';
import BekreftTilbakekrevKorreksjon from '@/refusjon/RefusjonSide/BekreftTilbakekrevKorreksjon';

type Props = {
    korreksjon: Korreksjon;
};

const KorreksjonSideVTAO: FunctionComponent<Props> = ({ korreksjon }) => {
    /*
    const korreksjonstype = (): KorreksjonStatus | null => {
        if (!korreksjon.refusjonsgrunnlag.beregning) {
            return null;
        }
        if (korreksjon.refusjonsgrunnlag.beregning.refusjonsbeløp > 0) {
            return KorreksjonStatus.TILLEGSUTBETALING;
        } else if (korreksjon.refusjonsgrunnlag.beregning.refusjonsbeløp < 0) {
            return KorreksjonStatus.TILBAKEKREVING;
        } else {
            return KorreksjonStatus.OPPGJORT;
        }
    };
    */

    return (
        <Boks variant="hvit">
            <BekreftSlettKorreksjon />

            <VerticalSpacer rem={2} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading size="large" role="heading">
                    Korreksjonsutkast
                </Heading>
            </div>

            <VerticalSpacer rem={1} />
            <BodyShort size="small">
                Dette er en korreksjon av tidligere utbetalt refusjon. Det beregnes her et foreløpig oppgjør fratrukket
                beløpet som er utbetalt tidligere. Dette er foreløpig et utkast, og den vises ikke for arbeidsgiver før
                den fullføres.
            </BodyShort>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalenVTAO
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKontonummer={korreksjon.refusjonsgrunnlag.bedriftKontonummer}
                åpnetFørsteGang={'2021-01-01'}
            />
            <VerticalSpacer rem={2} />
            <TilskuddssatsVTAO tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag} />
            <VerticalSpacer rem={1} />
            <KorreksjonUtregningVTAO
                refusjonsnummer={{
                    avtalenr: korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
                    løpenummer: korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
                }}
                erKorreksjon={true}
                beregning={korreksjon.refusjonsgrunnlag.beregning}
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag}
            />
            <VerticalSpacer rem={1} />
            <BekreftTilbakekrevKorreksjon />
        </Boks>
    );
};

export default KorreksjonSideVTAO;
