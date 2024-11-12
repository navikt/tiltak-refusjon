import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import BekreftelseModal from '~/bekreftelse-modal/BekreftelseModal';
import { fullførKorreksjonVedOppgjort } from '../../services/rest-service';
import { BodyShort, Button } from '@navikt/ds-react';
import LagreOgAvbrytKnapp from '@/komponenter/LagreOgAvbrytKnapp';

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
                lagreKnapp={
                    <LagreOgAvbrytKnapp
                        lagreFunksjon={() => fullførKorreksjonVedOppgjort(korreksjonId!)}
                        avbryt={() => setisOpen(false)}
                    >
                        OK
                    </LagreOgAvbrytKnapp>
                }
            >
                <BodyShort size="small">
                    Ved å fullføre korreksjonen vil arbeidsgiver få en bekreftelse på at utbetalt beløp er riktig.
                </BodyShort>
            </BekreftelseModal>
        </div>
    );
};

export default BekreftOppgjørKorreksjon;
