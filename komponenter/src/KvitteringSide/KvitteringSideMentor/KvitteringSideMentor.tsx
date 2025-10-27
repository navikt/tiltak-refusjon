import moment from 'moment';
import { Box, Heading, Tag, VStack } from '@navikt/ds-react';
import { FunctionComponent, ReactElement } from 'react';

import LagreSomPdfKnapp from '~/KvitteringSide/LagreSomPdfKnapp';
import OpprettKorreksjon from '~/knapp/OpprettKorreksjon';
import Statusmelding from '~/KvitteringSide/Statusmelding';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, Korreksjonsgrunn, Refusjon, RefusjonStatus, statusTekst } from '~/types';
import { InnloggetBruker } from '~/types/brukerContextType';
import { formatterDato, NORSK_DATO_FORMAT } from '~/utils';
import { lagId, storForbokstav } from '~/utils/stringUtils';
import InformasjonFraAvtalenMentor from './InformasjonFraAvtaleMentor';
import UtregningMentor from './UtregningMentor';
import SummeringBoksVTAO from '../KvitteringSideVTAO/SummeringBoksVTAO';

/**
 * For etterregistrerte avtaler av typen VTA-O vil det eksistere refusjoner som er "for tidlig",
 * hvor tilskuddsperioden var langt tilbake i tid, men de har allikevel ikke blitt sendt ut enda.
 * Da vil det se minst rart ut hvis vi sier at de sendes i morgen.
 */
const refusjonSendesDato = (refusjon: Refusjon): string => {
    const enDagEtterTilskuddsperioden = moment(refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom).add(1, 'days');
    const morgendagensDato = moment().add(1, 'days');
    const tidligsteDato = enDagEtterTilskuddsperioden.isBefore(morgendagensDato)
        ? morgendagensDato
        : enDagEtterTilskuddsperioden;
    return formatterDato(tidligsteDato.toString());
};

export const etikettForRefusjonStatus = (refusjon: Refusjon): ReactElement => {
    const statusetikettTekst =
        refusjon.status === RefusjonStatus.FOR_TIDLIG
            ? `sendes ${refusjonSendesDato(refusjon)}`
            : statusTekst[refusjon.status];
    if (refusjon.status === RefusjonStatus.UTBETALING_FEILET) {
        return <Tag variant="error">{storForbokstav(statusetikettTekst)} </Tag>;
    } else if (refusjon.status === RefusjonStatus.UTBETALT) {
        return (
            <Tag variant="info">
                {storForbokstav(statusetikettTekst)}{' '}
                {refusjon.utbetaltTidspunkt && formatterDato(refusjon.utbetaltTidspunkt, NORSK_DATO_FORMAT)}
            </Tag>
        );
    } else {
        return (
            <Tag variant="info">
                {storForbokstav(statusetikettTekst)}{' '}
                {refusjon.godkjentAvArbeidsgiver && formatterDato(refusjon.godkjentAvArbeidsgiver, NORSK_DATO_FORMAT)}
            </Tag>
        );
    }
};

interface Props {
    aktsomhet?: Aktsomhet;
    refusjon: Refusjon;
    innloggetBruker?: InnloggetBruker;
    opprettKorreksjon?: (
        grunner: Korreksjonsgrunn[],
        unntakOmInntekterFremitid?: number,
        annenKorreksjonsGrunn?: string
    ) => Promise<void>;
    settKid?: (kid?: string) => void;
}

const KvitteringSideMentor: FunctionComponent<Props> = (props: Props) => {
    const { refusjon, innloggetBruker, opprettKorreksjon, aktsomhet, settKid } = props;
    const innloggetRolle = innloggetBruker?.rolle;
    const refusjonsnummer = lagId(
        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.resendingsnummer
    );

    return (
        <VStack gap="space-16">
            <Box>
                {innloggetBruker !== undefined &&
                    innloggetBruker.harKorreksjonTilgang &&
                    refusjon.status !== RefusjonStatus.UTBETALING_FEILET &&
                    !refusjon.korreksjonId &&
                    opprettKorreksjon !== undefined && (
                        <>
                            <OpprettKorreksjon
                                tiltakType={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype}
                                opprettKorreksjon={opprettKorreksjon}
                            />
                            <VerticalSpacer rem={1} />
                        </>
                    )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Heading level="2" size="large">
                        Refusjon for Mentor
                    </Heading>
                    {etikettForRefusjonStatus(refusjon)}
                </div>
                <VerticalSpacer rem={1} />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5rem' }}>
                    <Statusmelding
                        status={refusjon.status}
                        vtao={true}
                        sendtTidspunkt={refusjon.godkjentAvArbeidsgiver}
                    />
                    {innloggetBruker !== undefined && innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                        <LagreSomPdfKnapp avtaleId={refusjon.id} />
                    )}
                </div>
                <VerticalSpacer rem={1} />
                <InformasjonFraAvtalenMentor
                    aktsomhet={aktsomhet}
                    innloggetRolle={innloggetRolle}
                    refusjonStatus={refusjon.status}
                    refusjonsgrunnlag={refusjon.refusjonsgrunnlag}
                    åpnetFørsteGang={refusjon.åpnetFørsteGang}
                    settKid={settKid}
                />
            </Box>
            <UtregningMentor
                refusjonsnummer={refusjonsnummer}
                erKorreksjon={false}
                tilskuddsgrunnlag={props.refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
            />
            <SummeringBoksVTAO refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
        </VStack>
    );
};

export default KvitteringSideMentor;
