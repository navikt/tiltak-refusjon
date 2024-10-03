import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { fullførKorreksjonVedOppgjort } from '../../services/rest-service';
import { BodyShort, Button } from '@navikt/ds-react';

const BekreftOppgjørKorreksjon: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const [isOpen, setisOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setisOpen(true)}>Fullfør</Button>

            <BekreftelseModal
                isOpen={isOpen}
                lukkModal={() => setisOpen(false)}
                tittel="Merk korreksjon som oppgjort"
                bekreft={() => fullførKorreksjonVedOppgjort(korreksjonId!)}
            >
                <BodyShort size="small">
                    Ved å fullføre korreksjonen vil arbeidsgiver få en bekreftelse på at utbetalt beløp er riktig.
                </BodyShort>
            </BekreftelseModal>
        </div>
    );
};

export default BekreftOppgjørKorreksjon;
