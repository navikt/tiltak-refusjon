import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { BriefcaseIcon, CalendarIcon, InformationSquareIcon, PadlockLockedIcon, WalletIcon } from '@navikt/aksel-icons';
import {
    Alert,
    BodyShort,
    Box,
    ExpansionCard,
    Heading,
    HGrid,
    HStack,
    Label,
    List,
    Loader,
    Tag,
    TextField,
    VStack,
} from '@navikt/ds-react';

import Pengesedler from '@/asset/image/pengesedler.svg?react';
import GodkjenningsPanel from '@/komponenter/GodkjenningsPanel';
import LagreKnapp from '@/komponenter/LagreKnapp';
import Utregning from '@/komponenter/Utregning';
import { godkjennRefusjon, lagreBedriftKID } from '@/services/rest-service';

import EksternLenke from '~/EksternLenke/EksternLenke';
import HemmeligAdresseVarsel from '~/HemmeligAdresseVarsel';
import KIDInputValidator from '~/KIDInputValidator';
import { Aktsomhet, Refusjon, statusTekst, tiltakstypeTekst } from '~/types';
import { formaterDato, formaterPeriode } from '~/utils';
import { formatterPenger } from '~/utils/PengeUtils';
import { storForbokstav } from '~/utils/stringUtils';

import RefusjonGodkjennModal from '../RefusjonGodkjennModal';
import RefusjonFullførNullbeløp from '../refusjonFullførNullbeløp/RefusjonFullførNullbeløp';
import TilbakeTilOversikt from '@/komponenter/TilbakeTilOversikt';

import Inntekter from './Inntekter';
import BruttolonnSporsmaal from '@/refusjon/RefusjonSide/NyRefusjonSide/BruttolonnSporsmaal';
import Fravaer from '@/refusjon/RefusjonSide/NyRefusjonSide/Fravaer';

interface Props {
    refusjon: Refusjon;
    aktsomhet?: Aktsomhet;
}

interface OppsummeringsradProps {
    etikett: string;
    children: React.ReactNode;
}

const Oppsummeringsrad = ({ etikett, children }: OppsummeringsradProps) => (
    <HGrid columns={{ xs: 1, sm: '6.25rem 1fr' }} gap={{ xs: 'space-2', sm: 'space-8' }}>
        <BodyShort weight="semibold">{etikett}</BodyShort>
        <BodyShort>{children}</BodyShort>
    </HGrid>
);

const NyRefusjonSide = ({ refusjon, aktsomhet }: Props) => {
    const { tilskuddsgrunnlag, beregning, fratrekkRefunderbarBeløp, refunderbarBeløp, inntekterKunFraTiltaket } =
        refusjon.refusjonsgrunnlag;
    const navigate = useNavigate();
    const [visGodkjennModal, setVisGodkjennModal] = useState(false);
    const [visRefusjonInnsending, setVisRefusjonInnsending] = useState(true);
    const [bekreftetOpplysninger, setBekreftetOpplysninger] = useState(false);
    const [ikkeBekreftetFeilmelding, setIkkeBekreftetFeilmelding] = useState('');
    const [innsendingsfeilmelding, setInnsendingsfeilmelding] = useState('');
    const [feilmelding, setFeilmelding] = useState<string>();

    const refusjonsnummer = `${tilskuddsgrunnlag.avtaleNr}-${tilskuddsgrunnlag.løpenummer}`;
    const avtaleLenke = `https://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${tilskuddsgrunnlag.avtaleId}`;
    const kanSendeInn =
        refusjon.harTattStillingTilAlleInntektslinjer &&
        !!beregning &&
        typeof fratrekkRefunderbarBeløp === 'boolean' &&
        !(fratrekkRefunderbarBeløp && refunderbarBeløp === undefined) &&
        typeof inntekterKunFraTiltaket === 'boolean';

    const settKid = useCallback(
        (kid?: string) => lagreBedriftKID(refusjon.id, refusjon.sistEndret, kid),
        [refusjon.id, refusjon.sistEndret]
    );

    const fullførRefusjon = async (): Promise<void> => {
        if (feilmelding) {
            setInnsendingsfeilmelding('Rett feilen i KID-nummeret før du fullfører.');
        } else if (!bekreftetOpplysninger) {
            setIkkeBekreftetFeilmelding('Du må bekrefte at opplysningene er riktige før du kan sende inn skjemaet.');
        } else {
            setVisGodkjennModal(true);
        }
    };

    const godkjennRefusjonen = async (): Promise<void> => {
        await godkjennRefusjon(refusjon.id, refusjon.sistEndret);
        navigate({ pathname: `/refusjon/${refusjon.id}/kvittering`, search: window.location.search });
    };

    return (
        <main style={{ margin: '0 auto', maxWidth: '53.75rem' }}>
            <TilbakeTilOversikt />
            <Box background="default" padding={{ xs: 'space-16', md: 'space-32' }}>
                <VStack gap={{ xs: 'space-40', md: 'space-64' }}>
                    <VStack gap="space-24">
                        <VStack>
                            <HStack align="start" gap="space-16" justify="space-between" wrap>
                                <Heading level="1" size="medium">
                                    Refusjonsnr {refusjonsnummer}
                                </Heading>
                                <HStack align="center" gap={{ xs: 'space-8', md: 'space-24' }} wrap>
                                    <Tag variant="info">{storForbokstav(statusTekst[refusjon.status])}</Tag>
                                    <Tag variant="warning">Frist {formaterDato(refusjon.fristForGodkjenning)}</Tag>
                                </HStack>
                            </HStack>
                            <BodyShort size="small">
                                {storForbokstav(tiltakstypeTekst[tilskuddsgrunnlag.tiltakstype])}
                            </BodyShort>
                        </VStack>

                        {aktsomhet?.kreverAktsomhet && <HemmeligAdresseVarsel aktsomhet={aktsomhet} />}

                        <VStack gap="space-8">
                            <Oppsummeringsrad etikett="Arbeidsgiver">{tilskuddsgrunnlag.bedriftNavn}</Oppsummeringsrad>
                            <Oppsummeringsrad etikett="Periode">
                                {formaterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}
                            </Oppsummeringsrad>
                            <Oppsummeringsrad etikett="Deltaker">
                                {tilskuddsgrunnlag.deltakerFornavn} {tilskuddsgrunnlag.deltakerEtternavn}
                            </Oppsummeringsrad>
                            <Oppsummeringsrad etikett="Avtale">
                                <EksternLenke href={avtaleLenke}>{tilskuddsgrunnlag.avtaleNr}</EksternLenke>
                            </Oppsummeringsrad>
                        </VStack>
                    </VStack>

                    <Fravaer refusjon={refusjon} />
                    <Inntekter refusjon={refusjon} />
                    <RefusjonFullførNullbeløp />
                    <BruttolonnSporsmaal refusjon={refusjon} setVisRefusjonInnsending={setVisRefusjonInnsending} />

                    <VStack gap="space-20" maxWidth="18.125rem">
                        {refusjon.refusjonsgrunnlag.bedriftKontonummer ? (
                            <TextField
                                label="Kontonummer"
                                description={
                                    <>
                                        Hvis kontonummeret ikke stemmer, må det oppdateres hos{' '}
                                        <EksternLenke href="https://www.nav.no/arbeidsgiver/endre-kontonummer">
                                            Nav
                                        </EksternLenke>
                                    </>
                                }
                                value={refusjon.refusjonsgrunnlag.bedriftKontonummer}
                                size="small"
                                type="text"
                                readOnly
                            />
                        ) : !refusjon.åpnetFørsteGang ? (
                            <Loader size="small" title="Henter kontonummer" />
                        ) : (
                            <Alert variant="error" size="small">
                                Vi finner ikke kontonummeret. Det må registreres hos Nav.
                            </Alert>
                        )}
                        <KIDInputValidator
                            hideLabel={false}
                            kid={refusjon.refusjonsgrunnlag.bedriftKid}
                            label="KID-nummer for utbetaling (valgfritt)"
                            onEndring={settKid}
                            onFeil={(feil) => {
                                setFeilmelding(feil);
                                if (!feil) setInnsendingsfeilmelding('');
                            }}
                        />
                    </VStack>

                    {visRefusjonInnsending && kanSendeInn && beregning && (
                        <>
                            <Box borderColor="accent-subtle" borderRadius="8" borderWidth="3" padding="space-12">
                                <HStack align="center" gap="space-20">
                                    <Pengesedler aria-hidden width="56" />
                                    <VStack gap="space-4">
                                        <Label>Det utbetales {formatterPenger(beregning.refusjonsbeløp)}</Label>
                                        <BodyShort>
                                            For perioden{' '}
                                            {formaterPeriode(
                                                tilskuddsgrunnlag.tilskuddFom,
                                                tilskuddsgrunnlag.tilskuddTom
                                            )}{' '}
                                            til kontonummer {refusjon.refusjonsgrunnlag.bedriftKontonummer}
                                        </BodyShort>
                                    </VStack>
                                </HStack>
                            </Box>

                            <ExpansionCard aria-labelledby="utregningen-tittel">
                                <ExpansionCard.Header>
                                    <ExpansionCard.Title as="h2" id="utregningen-tittel">
                                        Utregningen
                                    </ExpansionCard.Title>
                                </ExpansionCard.Header>
                                <ExpansionCard.Content>
                                    <Box overflowX="auto">
                                        <Utregning
                                            refusjonsnummer={{
                                                avtalenr: tilskuddsgrunnlag.avtaleNr,
                                                løpenummer: tilskuddsgrunnlag.løpenummer,
                                            }}
                                            erKorreksjon={false}
                                            forrigeRefusjonMinusBeløp={
                                                refusjon.refusjonsgrunnlag.forrigeRefusjonMinusBeløp || 0
                                            }
                                            beregning={beregning}
                                            tilskuddsgrunnlag={tilskuddsgrunnlag}
                                            inntektsgrunnlag={refusjon.refusjonsgrunnlag.inntektsgrunnlag}
                                            skjulTittel
                                            sumUtbetaltVarig={refusjon.refusjonsgrunnlag.sumUtbetaltVarig}
                                        />
                                    </Box>
                                </ExpansionCard.Content>
                            </ExpansionCard>

                            <VStack gap="space-12">
                                <Box borderColor="info" borderRadius="12" borderWidth="1" overflow="hidden">
                                    <Box
                                        background="info-moderate"
                                        borderColor="info-subtleA"
                                        borderWidth="0 0 1"
                                        paddingBlock="space-8"
                                        paddingInline="space-20"
                                    >
                                        <HStack align="center" gap="space-8">
                                            <InformationSquareIcon aria-hidden fontSize="1.5rem" />
                                            <Heading level="2" size="medium">
                                                Arbeidsgivers ansvar
                                            </Heading>
                                        </HStack>
                                    </Box>
                                    <Box paddingBlock="space-12 space-16" paddingInline="space-20">
                                        <List>
                                            <List.Item icon={<CalendarIcon aria-hidden />} title="Frist for innsending">
                                                <VStack gap="space-24">
                                                    <BodyShort>
                                                        Siste frist for å sende inn kravet er senest to måneder etter at
                                                        perioden er over. Hvis fristen ikke holdes, trekkes tilskuddet
                                                        som er innvilget og dere får ikke utbetalt støtte.
                                                    </BodyShort>
                                                    <BodyShort>
                                                        Dersom deltakeren har hatt fravær med lønn som blir refundert av
                                                        Nav i perioden, utsettes fristen når dere venter på riktig beløp
                                                        for refusjon for fravær.
                                                    </BodyShort>
                                                </VStack>
                                            </List.Item>
                                            <List.Item
                                                icon={<WalletIcon aria-hidden />}
                                                title="Tilskuddsperiode og refusjon"
                                            >
                                                <VStack gap="space-24">
                                                    <BodyShort>
                                                        Tilskuddet reguleres av forskrift for arbeidsmarkedstiltak.
                                                    </BodyShort>
                                                    <BodyShort>
                                                        Nav og Riksrevisjonen kan kontrollere at pengene som blir
                                                        utbetalt blir brukt riktig, for eksempel ved stikkprøvekontroll,
                                                        jf. Bevilgningsreglementet av 26.05.2005 § 10, 2. ledd.
                                                    </BodyShort>
                                                    <BodyShort>
                                                        Endringer i avtalen etterbetales ikke, og vil først gjelde for
                                                        tilskuddsperioder som ikke allerede er godkjent ved tidspunktet
                                                        for endringen.
                                                    </BodyShort>
                                                </VStack>
                                            </List.Item>
                                            <List.Item
                                                icon={<BriefcaseIcon aria-hidden />}
                                                title="Hva sier regelverket?"
                                            >
                                                <VStack gap="space-4">
                                                    <EksternLenke href="https://lovdata.no/forskrift/2015-12-11-1598">
                                                        Forskrift om arbeidsmarkedstiltak (tiltaksforskriften)
                                                    </EksternLenke>
                                                    <EksternLenke href="https://lovdata.no/nav/rundskriv/r76-12-01">
                                                        Utfyllende regler til forskriften
                                                    </EksternLenke>
                                                </VStack>
                                            </List.Item>
                                        </List>
                                    </Box>
                                </Box>

                                <GodkjenningsPanel
                                    checkboxLabel="Ja, jeg bekrefter."
                                    error={ikkeBekreftetFeilmelding}
                                    isChecked={bekreftetOpplysninger}
                                    setChecked={(checked) => {
                                        setBekreftetOpplysninger(checked);
                                        setIkkeBekreftetFeilmelding('');
                                    }}
                                >
                                    <List>
                                        <List.Item>Innholdet i avtalen er korrekt</List.Item>
                                        <List.Item>Kravene til arbeidsgiver er lest og forstått</List.Item>
                                    </List>
                                </GodkjenningsPanel>
                            </VStack>

                            {feilmelding && (
                                <Alert variant="error" role="alert">
                                    {feilmelding}
                                </Alert>
                            )}
                            {innsendingsfeilmelding && (
                                <Alert variant="error" role="alert">
                                    {innsendingsfeilmelding}
                                </Alert>
                            )}
                            <LagreKnapp variant="primary" lagreFunksjon={fullførRefusjon}>
                                Fullfør
                            </LagreKnapp>
                        </>
                    )}
                </VStack>
            </Box>

            <RefusjonGodkjennModal
                refusjon={refusjon}
                visGodkjennModal={visGodkjennModal}
                setVisGodkjennModal={setVisGodkjennModal}
                godkjennRefusjonen={godkjennRefusjonen}
            />
        </main>
    );
};

export default NyRefusjonSide;
