import { FunctionComponent, Suspense } from 'react';
import { Alert } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';

import HandlingerMeny from './HandlingerMeny';
import HenterInntekterBoks from '~/HenterInntekterBoks';
import KvitteringSide from '@/refusjon/KvitteringSide/KvitteringSide';
import KvitteringSideVTAO from '~/KvitteringSide/KvitteringSideVTAO';
import KvitteringSideMentor from '~/KvitteringSide/KvitteringSideMentor';
import TilbakeTilOversikt from '@/komponenter/tilbake-til-oversikt/TilbakeTilOversikt';
import VerticalSpacer from '~/VerticalSpacer';
import { Tiltak, Korreksjonsgrunn, RefusjonStatus, BrukerContextType } from '~/types';
import { beregnDagenEtterOgFormater, formaterDato } from '~/utils';
import { opprettKorreksjonsutkast, useHentRefusjon, useRefusjonKreverAktsomhet } from '@/services/rest-service';
import { useInnloggetBruker } from '@/bruker/BrukerContext';

import FeilSide from './FeilSide';
import RefusjonSide from './RefusjonSide';

const Advarsler: FunctionComponent = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const refusjon = useHentRefusjon(refusjonId!);
    const brukerContext: BrukerContextType = useInnloggetBruker();

    return (
        <>
            {brukerContext.innloggetBruker.harKorreksjonTilgang && refusjon.korreksjonId && (
                <>
                    <Alert variant="info" size="small">
                        Denne refusjonen er det gjort korrigeringer på.{' '}
                        <Link to={`/korreksjon/${refusjon.korreksjonId}`}>Klikk her for å åpne korreksjonen.</Link>
                    </Alert>
                    <VerticalSpacer rem={1} />
                </>
            )}
        </>
    );
};

const Komponent: FunctionComponent = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const refusjon = useHentRefusjon(refusjonId!);
    const brukerContext: BrukerContextType = useInnloggetBruker();
    const navigate = useNavigate();
    const { data: aktsomhet } = useRefusjonKreverAktsomhet(refusjon.id);
    const tiltakstype = refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype;

    const opprettKorreksjon = async (
        grunner: Korreksjonsgrunn[],
        unntakOmInntekterFremitid?: number,
        annenKorreksjonsGrunn?: string
    ) => {
        let oppdatertRefusjon;
        if (tiltakstype === Tiltak.VTAO) {
            oppdatertRefusjon = await opprettKorreksjonsutkast(
                refusjonId!,
                [Korreksjonsgrunn.DELTAKER_HAR_IKKE_VÆRT_TILSTEDE_I_PERIODEN],
                undefined,
                undefined
            );
        } else {
            oppdatertRefusjon = await opprettKorreksjonsutkast(
                refusjonId!,
                grunner,
                unntakOmInntekterFremitid,
                annenKorreksjonsGrunn
            );
        }
        navigate('/korreksjon/' + oppdatertRefusjon.korreksjonId);
    };

    switch (refusjon.status) {
        case RefusjonStatus.FOR_TIDLIG:
            if (tiltakstype === Tiltak.VTAO) {
                return (
                    <KvitteringSideVTAO
                        aktsomhet={aktsomhet}
                        refusjon={refusjon}
                        innloggetBruker={brukerContext.innloggetBruker}
                        headerActions={<HandlingerMeny refusjon={refusjon} />}
                    />
                );
            }
            if (tiltakstype === Tiltak.MENTOR) {
                return (
                    <KvitteringSideMentor
                        aktsomhet={aktsomhet}
                        refusjon={refusjon}
                        innloggetBruker={brukerContext.innloggetBruker}
                        headerActions={<HandlingerMeny refusjon={refusjon} />}
                    />
                );
            }
            return (
                <FeilSide
                    aktsomhet={aktsomhet}
                    refusjon={refusjon}
                    advarselType="info"
                    feiltekst={`Du kan søke om refusjon fra ${beregnDagenEtterOgFormater(
                        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )} når perioden er over.`}
                />
            );
        case RefusjonStatus.KLAR_FOR_INNSENDING:
            return <RefusjonSide aktsomhet={aktsomhet} refusjon={refusjon} />;
        case RefusjonStatus.UTGÅTT:
            return (
                <FeilSide
                    aktsomhet={aktsomhet}
                    refusjon={refusjon}
                    advarselType="warning"
                    feiltekst={`Fristen for å søke om refusjon for denne perioden gikk ut ${formaterDato(
                        refusjon.fristForGodkjenning
                    )}. Fristen kan ikke forlenges etter at den er utgått.`}
                />
            );
        case RefusjonStatus.ANNULLERT:
            return (
                <FeilSide
                    aktsomhet={aktsomhet}
                    refusjon={refusjon}
                    advarselType="warning"
                    feiltekst="Refusjonen er annullert. Avtalen ble annullert."
                />
            );
        case RefusjonStatus.SENDT_KRAV:
        case RefusjonStatus.GODKJENT_MINUSBELØP:
        case RefusjonStatus.GODKJENT_NULLBELØP:
        case RefusjonStatus.UTBETALT:
        case RefusjonStatus.UTBETALING_FEILET:
        case RefusjonStatus.KORRIGERT:
            if (tiltakstype === Tiltak.MENTOR) {
                return (
                    <KvitteringSideMentor
                        aktsomhet={aktsomhet}
                        refusjon={refusjon}
                        innloggetBruker={brukerContext.innloggetBruker}
                        headerActions={<HandlingerMeny refusjon={refusjon} />}
                    />
                );
            }
            if (tiltakstype === Tiltak.VTAO) {
                return (
                    <KvitteringSideVTAO
                        aktsomhet={aktsomhet}
                        refusjon={refusjon}
                        innloggetBruker={brukerContext.innloggetBruker}
                        headerActions={<HandlingerMeny refusjon={refusjon} opprettKorreksjon={opprettKorreksjon} />}
                    />
                );
            }
            return <KvitteringSide aktsomhet={aktsomhet} refusjon={refusjon} opprettKorreksjon={opprettKorreksjon} />;
    }
};

const Refusjon: FunctionComponent = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: '0 0 80rem', flexShrink: 1 }}>
                <TilbakeTilOversikt />
                <Suspense fallback={<HenterInntekterBoks />}>
                    <Advarsler />
                    <Komponent />
                </Suspense>
            </div>
        </div>
    );
};

export default Refusjon;
