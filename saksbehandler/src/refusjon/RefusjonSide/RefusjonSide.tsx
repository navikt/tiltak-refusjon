import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import InformasjonFraAvtalen from './InformasjonFraAvtalen';
import InntekterFraAMeldingen from './InntekterFraAMeldingen/InntekterFraAMeldingen';
import HarTattStillingTilAlleInntektsLinjerGammel from './HarTattStillingTilAlleInntektsLinjerGammel';
import './RefusjonSide.less';
import TidligereRefunderbarBeløpKvittering from './TidligereRefunderbarBeløpKvittering';
import Utregning from './Utregning';
import InntekterFraTiltaketSvar from './HarTattStillingTilAlleInntektsLinjerNy';
import StatusTekst from '~/StatusTekst';
import EksternLenke from '~/EksternLenke/EksternLenke';
import Boks from '~/Boks';
import { tiltakstypeTekst } from '~/types/messages';

const RefusjonSide: FunctionComponent = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const refusjon = useHentRefusjon(refusjonId!);

    return (
        <Boks variant="hvit">
            {refusjon.status === 'KLAR_FOR_INNSENDING' && refusjon.refusjonsgrunnlag.inntektsgrunnlag === null && (
                <Alert variant="info" size="small">
                    <Heading spacing size="small">
                        Obs! Arbeidsgiver har ikke vært inne på denne refusjonen.
                    </Heading>
                    Det har aldri vært forsøkt hentet inntektsgrunnlag og kontonummer, noe som gjøres hver gang
                    arbeidsgiver åpner refusjoner som er klare for innsending.
                </Alert>
            )}
            <VerticalSpacer rem={2} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading size="large">Beregning av refusjon for {tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}</Heading>
                <StatusTekst
                    status={refusjon.status}
                    tiltakstype={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype}
                    tilskuddFom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom}
                    tilskuddTom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom}
                    fratrekkRefunderbarBeløp={refusjon.refusjonsgrunnlag.fratrekkRefunderbarBeløp}
                />
            </div>
            <VerticalSpacer rem={1} />
            <BodyShort size="small">
                Vi henter inntektsopplysninger for deltakeren fra a-meldingen automatisk. Hvis inntektsopplysningene
                ikke stemmer så må det{' '}
                <EksternLenke href={'https://www.altinn.no/skjemaoversikt/a-ordningen/a-melding2/'}>
                    oppdateres i A-meldingen hos Altinn.
                </EksternLenke>
                Feriepenger, innskudd obligatorisk tjenestepensjon, arbeidsgiveravgiften og lønnstilskuddsprosenten er
                hentet fra avtalen om midlertidig lønnstilskudd.
            </BodyShort>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={refusjon.refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={refusjon.refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={refusjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
                fristForGodkjenning={refusjon.fristForGodkjenning}
                forrigeFristForGodkjenning={refusjon.forrigeFristForGodkjenning}
            />
            <VerticalSpacer rem={2} />
            <InntekterFraAMeldingen
                inntektsgrunnlag={refusjon.refusjonsgrunnlag.inntektsgrunnlag}
                kvitteringVisning={true}
                refusjonsgrunnlag={refusjon.refusjonsgrunnlag}
                unntakOmInntekterFremitid={refusjon.unntakOmInntekterFremitid}
            />
            <VerticalSpacer rem={2} />
            {refusjon.harTattStillingTilAlleInntektslinjer && (
                <InntekterFraTiltaketSvar refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
            )}
            {!refusjon.harTattStillingTilAlleInntektslinjer && refusjon.status !== 'KLAR_FOR_INNSENDING' && (
                <HarTattStillingTilAlleInntektsLinjerGammel refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
            )}
            <VerticalSpacer rem={2} />
            <TidligereRefunderbarBeløpKvittering refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
            <VerticalSpacer rem={2} />
            {refusjon.refusjonsgrunnlag.beregning && (
                <Utregning
                    refusjonsnummer={{
                        avtalenr: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
                        løpenummer: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
                    }}
                    erKorreksjon={false}
                    beregning={refusjon.refusjonsgrunnlag.beregning}
                    tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                    forrigeRefusjonMinusBeløp={refusjon.refusjonsgrunnlag.forrigeRefusjonMinusBeløp}
                    inntektsgrunnlag={refusjon.refusjonsgrunnlag.inntektsgrunnlag}
                />
            )}
        </Boks>
    );
};

export default RefusjonSide;
