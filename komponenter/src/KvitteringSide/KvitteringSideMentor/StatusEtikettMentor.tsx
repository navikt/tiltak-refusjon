import { ReactElement } from 'react';
import { Refusjon, RefusjonStatus, statusTekst } from '~/types';
import { formatterDato } from '~/utils';
import { Tag } from '@navikt/ds-react';
import { addDays, isBefore } from 'date-fns';
import { NORSK_DATO_FORMAT } from '~/utils/datoUtils';
import { storForbokstav } from '~/utils/stringUtils';

/**
 * For etterregistrerte avtaler av typen MENTOR vil det eksistere refusjoner som er "for tidlig",
 * hvor tilskuddsperioden var langt tilbake i tid, men de har allikevel ikke blitt sendt ut enda.
 * Da vil det se minst rart ut hvis vi sier at de sendes i morgen.
 */
const refusjonSendesDato = (refusjon: Refusjon): string => {
    const enDagEtterTilskuddsperioden = addDays(refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom, 1);
    const morgendagensDato = addDays(new Date(), 1);
    const tidligsteDato = isBefore(enDagEtterTilskuddsperioden, morgendagensDato)
        ? morgendagensDato
        : enDagEtterTilskuddsperioden;
    return formatterDato(tidligsteDato.toString());
};

export type StatusEtikettProps = { refusjon: Refusjon };

const StatusEtikettMentor = ({ refusjon }: StatusEtikettProps): ReactElement => {
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

export default StatusEtikettMentor;
