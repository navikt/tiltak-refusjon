import React, { FunctionComponent } from 'react';
import { Alert, BodyShort } from '@navikt/ds-react';
import { RefusjonStatus } from '~/types/status';
import { formatterDato, NORSK_DATO_FORMAT } from '~/utils/datoUtils';

const Statusmelding: FunctionComponent<{
    status: RefusjonStatus;
    sendtTidspunkt?: string;
    sendesDato?: string;
    vtao?: boolean;
}> = ({ status, sendtTidspunkt, sendesDato, vtao }) => {
    switch (status) {
        case RefusjonStatus.UTBETALING_FEILET:
            return (
                <Alert variant="warning" size="small">
                    Vi har problemer med utbetalingen. Sjekk at kontonummeret oppgitt i avtalen er i bruk. Ta kontakt
                    med veileder for å få hjelp.
                </Alert>
            );
        case RefusjonStatus.UTBETALT:
            if (sendtTidspunkt) {
                return (
                    <BodyShort size="small">
                        Refusjonskravet ble sendt {formatterDato(sendtTidspunkt, NORSK_DATO_FORMAT)} og er nå utbetalt.
                    </BodyShort>
                );
            }
            return <BodyShort size="small">Refusjonskravet er utbetalt.</BodyShort>;
        case RefusjonStatus.GODKJENT_MINUSBELØP:
        case RefusjonStatus.GODKJENT_NULLBELØP:
            return (
                <BodyShort size="small">
                    Refusjonskravet er godkjent. Denne refusjonen vil bli tatt vare på i oversikten.
                </BodyShort>
            );
        case RefusjonStatus.FOR_TIDLIG:
            if (vtao) {
                return <BodyShort size="small">Refusjonskravet vil sendes inn automatisk den {sendesDato}.</BodyShort>;
            }
            return <BodyShort size="small">Refusjonskravet kan ikke sendes inn enda.</BodyShort>;
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
