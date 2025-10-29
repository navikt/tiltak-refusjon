import { Heading, Tag } from '@navikt/ds-react';
import { ReactElement } from 'react';
import Boks from '~/Boks';
import LagreSomPdfKnapp from '~/KvitteringSide/LagreSomPdfKnapp';
import Statusmelding from '~/KvitteringSide/Statusmelding';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, statusTekst, tiltakstypeTekst, RefusjonStatus, Refusjon } from '~/types';
import { formatterDato, NORSK_DATO_FORMAT } from '~/utils';
import { storForbokstav } from '~/utils/stringUtils';
import UtregningMentor from '~/KvitteringSide/KvitteringSideMentor/UtregningMentor';
import InformasjonFraAvtalenMentor from '~/KvitteringSide/KvitteringSideMentor/InformasjonFraAvtaleMentor';
import SummeringBoksMentor from '~/KvitteringSide/KvitteringSideMentor/SummeringBoksMentor';
import moment from 'moment';

/**
 * For etterregistrerte avtaler av typen MENTOR vil det eksistere refusjoner som er "for tidlig",
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
}

const KvitteringSideMentorArbeidsgiver = (props: Props) => {
    const { refusjon, aktsomhet } = props;

    return (
        <Boks variant="hvit">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading size="large" role="heading">
                    Refusjon for {tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}
                </Heading>
                {etikettForRefusjonStatus(refusjon)}
            </div>
            <VerticalSpacer rem={1} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5rem' }}>
                <Statusmelding status={refusjon.status} sendtTidspunkt={refusjon.godkjentAvArbeidsgiver} vtao={true} />
                <LagreSomPdfKnapp avtaleId={refusjon.id} />
            </div>

            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalenMentor refusjonsgrunnlag={refusjon.refusjonsgrunnlag} aktsomhet={aktsomhet} />
            <VerticalSpacer rem={2} />
            <UtregningMentor
                tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                beregning={refusjon.refusjonsgrunnlag.beregning}
            />
            <VerticalSpacer rem={2} />
            <SummeringBoksMentor refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
        </Boks>
    );
};

export default KvitteringSideMentorArbeidsgiver;
