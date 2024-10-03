import React, { FunctionComponent } from 'react';
import { Alert, BodyShort } from '@navikt/ds-react';
import { RefusjonStatus } from '../refusjon';

interface Props {
    status: RefusjonStatus;
}

const Statusmelding: FunctionComponent<Props> = (props) => {
    switch (props.status) {
        case RefusjonStatus.UTBETALING_FEILET:
            return (
                <Alert variant="warning" size="small">
                    Vi har problemer med utbetalingen. Arbeidgiver har fått beskjed om å ta kontakt med veileder. Meld
                    inn problemet som porten-sak. Noter refusjonsnummer.
                </Alert>
            );
        case RefusjonStatus.UTBETALT:
            return (
                <BodyShort size="small">
                    Refusjonskravet er utbetalt. Det vil ta 3–4 dager før pengene kommer på kontoen.
                </BodyShort>
            );
        case RefusjonStatus.GODKJENT_MINUSBELØP:
        case RefusjonStatus.GODKJENT_NULLBELØP:
            return (
                <BodyShort size="small">
                    Refusjonskravet er godkjent. Denne refusjonen vil bli tatt vare på i oversikten.
                </BodyShort>
            );
        default:
            return (
                <BodyShort size="small">
                    Refusjonskravet er nå sendt. Det vil ta 3–4 dager før pengene kommer på kontoen. Denne refusjonen
                    vil bli tatt vare på under “Sendt krav”.
                </BodyShort>
            );
    }
};
export default Statusmelding;
