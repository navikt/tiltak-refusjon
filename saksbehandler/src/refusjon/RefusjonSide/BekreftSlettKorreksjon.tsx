import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { slettKorreksjonsutkast, useHentKorreksjon } from '../../services/rest-service';
import { BodyShort, Button } from '@navikt/ds-react';

const BekreftSlettKorreksjon: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const korreksjon = useHentKorreksjon(korreksjonId!);
    const navigate = useNavigate();

    const [åpen, setÅpen] = useState(false);
    return (
        <>
            <Button
                onClick={() => {
                    setÅpen(true);
                }}
            >
                Slett korreksjonsutkast
            </Button>
            <BekreftelseModal
                isOpen={åpen}
                lukkModal={() => setÅpen(false)}
                bekreft={async () => {
                    await slettKorreksjonsutkast(korreksjonId!);
                    navigate('/refusjon/' + korreksjon.korrigererRefusjonId);
                }}
                tittel={'Slett korreksjonsutkast'}
            >
                <BodyShort size="small">Vil du slette utkastet?</BodyShort>
            </BekreftelseModal>
        </>
    );
};

export default BekreftSlettKorreksjon;
