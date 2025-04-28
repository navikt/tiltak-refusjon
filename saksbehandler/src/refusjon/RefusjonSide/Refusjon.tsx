import React, { FunctionComponent, Suspense } from 'react';
import { Alert } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import ForlengFrist from '@/refusjon/ForlengFrist/ForlengFrist';
import HendelsesLogg from '@/refusjon/Hendelseslogg/Hendelseslogg';
import HenterInntekterBoks from '~/HenterInntekterBoks';
import KvitteringSide from '@/refusjon/KvitteringSide/KvitteringSide';
import KvitteringSideVTAO from '~/KvitteringSide/KvitteringSideVTAO';
import MerkForUnntakOmInntekterToMånederFrem from '@/refusjon/MerkForUnntakOmInntekterFremITid/MerkForUnntakOmInntekterFremITid';
import TilbakeTilOversikt from '@/komponenter/tilbake-til-oversikt/TilbakeTilOversikt';
import VerticalSpacer from '~/VerticalSpacer';
import { Tiltak, Korreksjonsgrunn, RefusjonStatus, BrukerContextType } from '~/types';
import { formatterDato } from '~/utils';
import { opprettKorreksjonsutkast, useHentRefusjon, useRefusjonKreverAktsomhet } from '@/services/rest-service';
import { useInnloggetBruker } from '@/bruker/BrukerContext';

import FeilSide from './FeilSide';
import RefusjonSide from './RefusjonSide';
import styles from './Refusjon.module.less';

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

    const opprettKorreksjon = async (
        grunner: Korreksjonsgrunn[],
        unntakOmInntekterFremitid?: number,
        annenKorreksjonsGrunn?: string
    ) => {
        let oppdatertRefusjon;
        if (refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === Tiltak.VTAO) {
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
            if (refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype == 'VTAO') {
                return (
                    <>
                        <div className={styles.fleks}>
                            <HendelsesLogg refusjonId={refusjonId} />
                        </div>
                        <VerticalSpacer rem={1} />
                        <KvitteringSideVTAO
                            aktsomhet={aktsomhet}
                            refusjon={refusjon}
                            innloggetBruker={brukerContext.innloggetBruker}
                        />
                    </>
                );
            }
            return (
                <>
                    <div className={styles.fleks}>
                        <HendelsesLogg refusjonId={refusjonId} />
                    </div>
                    <VerticalSpacer rem={1} />
                    <FeilSide
                        aktsomhet={aktsomhet}
                        refusjon={refusjon}
                        advarselType="info"
                        feiltekst={`Du kan søke om refusjon fra ${formatterDato(
                            refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                        )} når perioden er over.`}
                    />
                </>
            );
        case RefusjonStatus.KLAR_FOR_INNSENDING:
            return (
                <>
                    <div className={styles.fleks}>
                        <ForlengFrist
                            refusjonId={refusjon.id}
                            tidligsteFrist={refusjon.fristForGodkjenning}
                            senesteFrist={refusjon.senestMuligeGodkjenningsfrist}
                        />
                        {brukerContext.innloggetBruker.harKorreksjonTilgang && (
                            <MerkForUnntakOmInntekterToMånederFrem refusjon={refusjon} />
                        )}
                        <HendelsesLogg refusjonId={refusjonId} />
                    </div>
                    <VerticalSpacer rem={1} />
                    <RefusjonSide aktsomhet={aktsomhet} refusjon={refusjon} />
                </>
            );
        case RefusjonStatus.UTGÅTT:
            return (
                <>
                    <div className={styles.fleks}>
                        <HendelsesLogg refusjonId={refusjonId} />
                    </div>
                    <VerticalSpacer rem={1} />
                    <FeilSide
                        aktsomhet={aktsomhet}
                        refusjon={refusjon}
                        advarselType="warning"
                        feiltekst={`Fristen for å søke om refusjon for denne perioden gikk ut ${formatterDato(
                            refusjon.fristForGodkjenning
                        )}. Fristen kan ikke forlenges etter at den er utgått.`}
                    />
                </>
            );
        case RefusjonStatus.ANNULLERT:
            return (
                <>
                    <div className={styles.fleks}>
                        <HendelsesLogg refusjonId={refusjonId} />
                    </div>
                    <VerticalSpacer rem={1} />
                    <FeilSide
                        aktsomhet={aktsomhet}
                        refusjon={refusjon}
                        advarselType="warning"
                        feiltekst="Refusjonen er annullert. Avtalen ble annullert."
                    />
                </>
            );
        case RefusjonStatus.SENDT_KRAV:
        case RefusjonStatus.GODKJENT_MINUSBELØP:
        case RefusjonStatus.GODKJENT_NULLBELØP:
        case RefusjonStatus.UTBETALT:
        case RefusjonStatus.UTBETALING_FEILET:
        case RefusjonStatus.KORRIGERT:
            return (
                <>
                    <div className={styles.fleks}>
                        <HendelsesLogg refusjonId={refusjonId} />
                    </div>
                    <VerticalSpacer rem={1} />

                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === 'VTAO' ? (
                        <KvitteringSideVTAO
                            aktsomhet={aktsomhet}
                            refusjon={refusjon}
                            innloggetBruker={brukerContext.innloggetBruker}
                            opprettKorreksjon={opprettKorreksjon}
                        />
                    ) : (
                        <KvitteringSide
                            aktsomhet={aktsomhet}
                            refusjon={refusjon}
                            innloggetBruker={brukerContext.innloggetBruker}
                            opprettKorreksjon={opprettKorreksjon}
                        />
                    )}
                </>
            );
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
