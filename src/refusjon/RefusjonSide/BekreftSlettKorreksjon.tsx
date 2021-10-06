import React, { FunctionComponent, useState } from 'react';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { slettKorreksjon } from '../../services/rest-service';
import { useParams } from 'react-router';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';

interface Props {}

const BekreftSlettKorreksjon: FunctionComponent<Props> = (props) => {
    const { refusjonId } = useParams();
    const history = useHistory();

    const [åpen, setÅpen] = useState(false);
    return (
        <>
            <Knapp
                onClick={() => {
                    setÅpen(true);
                }}
            >
                Slett korreksjon
            </Knapp>
            <BekreftelseModal
                isOpen={åpen}
                lukkModal={() => setÅpen(false)}
                bekreft={async () => {
                    const korreksjon = await slettKorreksjon(refusjonId);
                    history.push('/refusjon/' + korreksjon.korreksjonAvId);
                }}
                tittel={'Slett korreksjon'}
            >
                <Normaltekst>Vil du slette korreksjonen?</Normaltekst>
            </BekreftelseModal>
        </>
    );
};

export default BekreftSlettKorreksjon;