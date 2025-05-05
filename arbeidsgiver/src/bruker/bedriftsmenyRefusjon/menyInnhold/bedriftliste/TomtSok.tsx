import React, { useContext } from 'react';

import { MenyContext } from '../../BedriftsmenyRefusjon';
import { Alert, BodyShort } from '@navikt/ds-react';
import BEMHelper from '~/utils/bem';

const TomtSok = () => {
    const cls = BEMHelper('bedriftliste');
    const { sokefelt } = useContext(MenyContext);
    const ingenSoketreff = sokefelt.aktivt && sokefelt.antallTreff === 0;

    return (
        <>
            {ingenSoketreff && (
                <div className={cls.element('tomt-sok')}>
                    <Alert variant="info" size="small">
                        <>
                            <BodyShort size="small">Søket returnerte ingen treff.</BodyShort>
                        </>
                    </Alert>
                </div>
            )}
        </>
    );
};
export default TomtSok;
