import { Korreksjon } from '@/refusjon/refusjon';
import { formatterPenger } from '@/utils/PengeUtils';
import { Alert, BodyShort, Heading, Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import HvitBoks from '../komponenter/hvitboks/HvitBoks';
import { korreksjonStatusTekst } from '../messages';
import InformasjonFraAvtalen from '../refusjon/RefusjonSide/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '../refusjon/RefusjonSide/InntekterFraAMeldingen/InntekterFraAMeldingen';
import InntekterFraAMeldingenGammel from '../refusjon/RefusjonSide/InntekterFraAmeldingenGammel';
import HarTattStillingTilAlleInntektsLinjerNy from '../refusjon/RefusjonSide/HarTattStillingTilAlleInntektsLinjerNy';
import HarTattStillingTilAlleInntektsLinjerGammel from '../refusjon/RefusjonSide/HarTattStillingTilAlleInntektsLinjerGammel';
import TidligereRefunderbarBeløpKvittering from '../refusjon/RefusjonSide/TidligereRefunderbarBeløpKvittering';
import Utregning from '../refusjon/RefusjonSide/Utregning';
import { storForbokstav } from '../utils/stringUtils';
import KorreksjonSummeringBoks from './KorreksjonSummeringsBoks';

type Props = {
    korreksjon: Korreksjon;
};

const KorreksjonKvitteringSide: FunctionComponent<Props> = ({ korreksjon }) => {
    return (
        <HvitBoks>
            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading size="large" role="heading">
                    Korreksjon av refusjon
                </Heading>
                <Tag variant="info">{storForbokstav(korreksjonStatusTekst[korreksjon.status])}</Tag>
            </div>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={korreksjon.refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={korreksjon.refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={korreksjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
            />
            <VerticalSpacer rem={2} />

            {korreksjon.harTattStillingTilAlleInntektslinjer ? (
                <>
                    <InntekterFraAMeldingen
                        inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag}
                        kvitteringVisning={true}
                        refusjonsgrunnlag={korreksjon.refusjonsgrunnlag}
                        unntakOmInntekterFremitid={0}
                    />
                    <VerticalSpacer rem={2} />
                    <HarTattStillingTilAlleInntektsLinjerNy refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
                </>
            ) : (
                <>
                    <InntekterFraAMeldingenGammel inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag} />
                    <HarTattStillingTilAlleInntektsLinjerGammel refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
                </>
            )}
            <TidligereRefunderbarBeløpKvittering refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
            <VerticalSpacer rem={2} />
            <Utregning
                refusjonsnummer={{
                    avtalenr: korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
                    løpenummer: korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
                }}
                erKorreksjon={true}
                beregning={korreksjon.refusjonsgrunnlag.beregning}
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag}
            />
            <VerticalSpacer rem={2} />
            {(korreksjon.refusjonsgrunnlag.beregning?.refusjonsbeløp || 0) >= 0 && (
                <Alert variant="info">
                    <BodyShort>
                        <b>Beslutter NAV:</b> Beløp blir automatisk utbetalt til arbeidsgiver. Midlene blir kostnadsført
                        på enhet {korreksjon.kostnadssted}.
                    </BodyShort>
                </Alert>
            )}
            {(korreksjon.refusjonsgrunnlag.beregning?.refusjonsbeløp || 0) < 0 && (
                <Alert variant="warning">
                    <BodyShort>
                        <b>Beslutter NAV:</b> Du må vurdere tilbakekreving i samsvar med gjeldene rutine på{' '}
                        <b>{formatterPenger(Math.abs(korreksjon.refusjonsgrunnlag.beregning?.refusjonsbeløp || 0))}</b>
                    </BodyShort>
                </Alert>
            )}
            <VerticalSpacer rem={2} />
            <KorreksjonSummeringBoks refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} korreksjon={korreksjon} />
        </HvitBoks>
    );
};

export default KorreksjonKvitteringSide;
