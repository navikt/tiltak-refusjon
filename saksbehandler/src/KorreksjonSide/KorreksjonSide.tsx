import { BodyShort, Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import HvitBoks from '../komponenter/hvitboks/HvitBoks';
import BekreftOppgjørKorreksjon from '../refusjon/RefusjonSide/BekreftOppgjørKorreksjon';
import BekreftSlettKorreksjon from '../refusjon/RefusjonSide/BekreftSlettKorreksjon';
import BekreftTilbakekrevKorreksjon from '../refusjon/RefusjonSide/BekreftTilbakekrevKorreksjon';
import BekreftUtbetalKorreksjon from '../refusjon/RefusjonSide/BekreftUtbetalKorreksjon';
import InformasjonFraAvtalen from '../refusjon/RefusjonSide/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '../refusjon/RefusjonSide/InntekterFraAMeldingen/InntekterFraAMeldingen';
import InntekterFraTiltaketSpørsmål from '../refusjon/RefusjonSide/InntekterFraTiltaketSpørsmål';
import Utregning from '../refusjon/RefusjonSide/Utregning';
import { Korreksjon, KorreksjonStatus } from '../refusjon/refusjon';
import OverstyrMinusbeløpOgFerietrekk from './OverstyrMinusbeløpOgFerietrekk';
import TidligereRefunderbarBeløp from './TidligereRefunderbarBeløp';

type Props = {
    korreksjon: Korreksjon;
};

const KorreksjonSide: FunctionComponent<Props> = ({ korreksjon }) => {
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

    return (
        <HvitBoks>
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
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={korreksjon.refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={korreksjon.refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={korreksjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
            />
            <VerticalSpacer rem={2} />
            <InntekterFraAMeldingen
                inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag}
                refusjonsgrunnlag={korreksjon.refusjonsgrunnlag}
                unntakOmInntekterFremitid={0}
                kvitteringVisning={false}
                korreksjonId={korreksjon.id}
            />
            <VerticalSpacer rem={2} />
            {korreksjon.refusjonsgrunnlag.inntektsgrunnlag?.inntekter.length !== 0 &&
                korreksjon.harTattStillingTilAlleInntektslinjer && (
                    <>
                        <InntekterFraTiltaketSpørsmål refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
                        <TidligereRefunderbarBeløp refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
                        <VerticalSpacer rem={2} />
                        {korreksjon.refusjonsgrunnlag.beregning &&
                            typeof korreksjon.refusjonsgrunnlag.fratrekkRefunderbarBeløp === 'boolean' && (
                                <>
                                    <OverstyrMinusbeløpOgFerietrekk
                                        harFerietrekkForSammeMåned={
                                            korreksjon.refusjonsgrunnlag.harFerietrekkForSammeMåned
                                        }
                                    />
                                    <Utregning
                                        refusjonsnummer={{
                                            avtalenr: korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
                                            løpenummer: korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
                                        }}
                                        erKorreksjon={true}
                                        beregning={korreksjon.refusjonsgrunnlag.beregning}
                                        tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                                        forrigeRefusjonMinusBeløp={
                                            korreksjon.refusjonsgrunnlag.forrigeRefusjonMinusBeløp
                                        }
                                        inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag}
                                    />
                                    <VerticalSpacer rem={1} />
                                    {korreksjonstype() === 'TILLEGSUTBETALING' && <BekreftUtbetalKorreksjon />}
                                    {korreksjonstype() === 'TILBAKEKREVING' && <BekreftTilbakekrevKorreksjon />}
                                    {korreksjonstype() === 'OPPGJORT' && <BekreftOppgjørKorreksjon />}
                                </>
                            )}
                    </>
                )}
        </HvitBoks>
    );
};

export default KorreksjonSide;
