import React, { FunctionComponent, useEffect, useRef } from 'react';
import TilbakeTilOversikt from '@/komponenter/TilbakeTilOversikt';
import KvitteringKorreksjon from '@/refusjon/KvitteringKorreksjon/KvitteringKorreksjon';
import KvitteringSide from '@/refusjon/KvitteringSide/KvitteringSide';
import FeilSide from './FeilSide';
import RefusjonSide from './RefusjonSide';
import { BodyShort } from '@navikt/ds-react';
import { useParams } from 'react-router-dom';
import {
    oppdaterRefusjonFetcher,
    useHentKorreksjon,
    useHentRefusjon,
    useRefusjonKreverAktsomhet,
} from '@/services/rest-service';
import useSWRMutation from 'swr/mutation';
import { mutate } from 'swr';
import { RefusjonStatus } from '~/types/status';
import { formatterDato } from '~/utils';
import { Refusjon as RefusjonType } from '~/types/refusjon';
import { BrukerContextType } from '~/types/brukerContextType';
import { useInnloggetBruker } from '@/bruker/BrukerContext';
import KvitteringSideVTAO from '~/KvitteringSide/KvitteringSideVTAO';
import { Aktsomhet } from '~/types';

const Komponent: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const erLastet = useRef(false);
    const brukerContext: BrukerContextType = useInnloggetBruker();
    const { data: aktsomhet } = useRefusjonKreverAktsomhet(refusjon.id);

    const { trigger, isMutating, reset } = useSWRMutation(`/refusjon/${refusjonId}`, oppdaterRefusjonFetcher);

    useEffect(() => {
        const asyncTrigger = async () => {
            try {
                await trigger(refusjon.sistEndret ? refusjon.sistEndret : '');
            } catch {
                reset();
                mutate(`/refusjon/${refusjonId}`);
            }
        };
        if (
            refusjon &&
            (refusjon.status === RefusjonStatus.FOR_TIDLIG || refusjon.status === RefusjonStatus.KLAR_FOR_INNSENDING) &&
            !erLastet.current
        ) {
            if (!isMutating) {
                asyncTrigger();
                erLastet.current = true;
            }
        }
    }, [isMutating, refusjon, trigger, reset, refusjonId]);

    if (!refusjon) return null;

    switch (refusjon.status) {
        case RefusjonStatus.FOR_TIDLIG:
            return refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === 'VTAO' ? (
                <KvitteringSideVTAO
                    aktsomhet={aktsomhet}
                    innloggetBruker={brukerContext.innloggetBruker}
                    refusjon={refusjon}
                />
            ) : (
                <FeilSide
                    advarselType="info"
                    feiltekst={
                        <>
                            <BodyShort style={{ marginBottom: '1rem' }}>
                                Du kan søke om refusjon fra{' '}
                                {formatterDato(refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom)} når perioden
                                er over.
                            </BodyShort>
                            <BodyShort>
                                Siste frist for å sende inn kravet er senest to måneder etter at perioden er over. Hvis
                                fristen ikke holdes, trekkes tilskuddet som er innvilget og dere får ikke utbetalt
                                støtte.
                            </BodyShort>
                        </>
                    }
                />
            );
        case RefusjonStatus.KLAR_FOR_INNSENDING:
            return <RefusjonSide aktsomhet={aktsomhet} refusjon={refusjon} />;
        case RefusjonStatus.UTGÅTT:
            return (
                <FeilSide
                    advarselType="warning"
                    feiltekst={`Fristen for å søke om refusjon for denne perioden gikk ut ${formatterDato(
                        refusjon.fristForGodkjenning
                    )}. Innvilget tilskudd er derfor trukket tilbake.`}
                />
            );
        case RefusjonStatus.ANNULLERT:
            return <FeilSide advarselType="warning" feiltekst="Refusjonen er annullert." />;
        case RefusjonStatus.SENDT_KRAV:
        case RefusjonStatus.GODKJENT_MINUSBELØP:
        case RefusjonStatus.GODKJENT_NULLBELØP:
        case RefusjonStatus.UTBETALT:
        case RefusjonStatus.UTBETALING_FEILET:
            return refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === 'VTAO' ? (
                <KvitteringSideVTAO
                    aktsomhet={aktsomhet}
                    innloggetBruker={brukerContext.innloggetBruker}
                    refusjon={refusjon}
                />
            ) : (
                <KvitteringSide aktsomhet={aktsomhet} refusjon={refusjon} />
            );
        case RefusjonStatus.KORRIGERT: {
            return <Korreksjonskvittering aktsomhet={aktsomhet} refusjon={refusjon} />;
        }
    }
};

const Korreksjonskvittering = ({ refusjon, aktsomhet }: { refusjon: RefusjonType; aktsomhet?: Aktsomhet }) => {
    const korreksjon = useHentKorreksjon(refusjon.korreksjonId!);
    return <KvitteringKorreksjon refusjon={refusjon} korreksjon={korreksjon} aktsomhet={aktsomhet} />;
};

const Refusjon: FunctionComponent = () => {
    return (
        <div style={{ margin: '0 auto', maxWidth: '80rem' }}>
            <div style={{ flex: '0 0 55rem', flexShrink: 1 }}>
                <TilbakeTilOversikt />
                <Komponent />
            </div>
        </div>
    );
};

export default Refusjon;
