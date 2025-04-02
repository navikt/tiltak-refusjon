import { BodyLong, Heading, Tag } from '@navikt/ds-react';
import { FunctionComponent, ReactElement } from 'react';
import Boks from '~/Boks/Boks';
import { statusTekst } from '~/types/messages';
import { Korreksjonsgrunn, Refusjon } from '~/types/refusjon';
import { RefusjonStatus } from '~/types/status';
import { formatterDato, NORSK_DATO_FORMAT } from '~/utils';
import { storForbokstav } from '~/utils/stringUtils';
import VerticalSpacer from '~/VerticalSpacer';
import InformasjonFraAvtalenVTAO from './InformasjonFraAvtaleVTAO';
import TilskuddssatsVTAO from './TilskuddssatsVTAO';
import SummeringBoksVTAO from './SummeringBoksVTAO';
import { InnloggetBruker } from '~/types/brukerContextType';
import OpprettKorreksjon from '~/knapp/OpprettKorreksjon';
import Statusmelding from '~/KvitteringSide/Statusmelding';
import LagreSomPdfKnapp from '~/KvitteringSide/LagreSomPdfKnapp';
import moment from 'moment';

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
    refusjon: Refusjon;
    innloggetBruker?: InnloggetBruker;
    opprettKorreksjon?: (
        grunner: Korreksjonsgrunn[],
        unntakOmInntekterFremitid?: number,
        annenKorreksjonsGrunn?: string
    ) => Promise<void>;
}
const KvitteringSideVTAO: FunctionComponent<Props> = ({ refusjon, innloggetBruker, opprettKorreksjon }) => {
    const innloggetRolle = innloggetBruker?.rolle;

    return (
        <Boks variant="hvit">
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
                    Refusjon for Varig tilrettelagt arbeid i ordinær virksomhet (VTA-O)
                </Heading>
                {etikettForRefusjonStatus(refusjon)}
            </div>
            <VerticalSpacer rem={1} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5rem' }}>
                <Statusmelding
                    status={refusjon.status}
                    sendesDato={refusjonSendesDato(refusjon)}
                    vtao={true}
                    sendtTidspunkt={refusjon.godkjentAvArbeidsgiver}
                />
                {innloggetBruker !== undefined && innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                    <LagreSomPdfKnapp avtaleId={refusjon.id} />
                )}
            </div>
            <VerticalSpacer rem={2} />
            <BodyLong>
                Dere får et tilskudd fra NAV for varig tilrettelagt arbeid. Satsen settes årlig av departementet og
                avtale- og refusjonsløsningen vil automatisk oppdateres når det kommer nye satser.
            </BodyLong>
            <VerticalSpacer rem={1} />
            <InformasjonFraAvtalenVTAO
                tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKontonummer={refusjon.refusjonsgrunnlag.bedriftKontonummer}
                innloggetRolle={innloggetRolle}
            />
            <VerticalSpacer rem={2} />
            <TilskuddssatsVTAO tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag} />
            <VerticalSpacer rem={1} />
            <SummeringBoksVTAO refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
        </Boks>
    );
};

export default KvitteringSideVTAO;
