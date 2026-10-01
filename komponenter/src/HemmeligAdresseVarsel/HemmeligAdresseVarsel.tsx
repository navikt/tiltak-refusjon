import React from 'react';
import { Alert, Heading } from '@navikt/ds-react';

import styles from './HemmeligAdresseVarsel.module.less';
import { Aktsomhet, Diskresjonskode } from '~/types';

interface Props {
    aktsomhet: Aktsomhet;
}

const HemmeligAdresseVarsel = (props: Props) => {
    const {
        aktsomhet: { diskresjonskode, kreverAktsomhet },
    } = props;

    if (!kreverAktsomhet) {
        return null;
    }

    return (
        <Alert variant="warning" className={styles.container}>
            <Heading spacing size="small" level="3">
                {(Diskresjonskode.STRENGT_FORTROLIG === diskresjonskode ||
                    Diskresjonskode.STRENGT_FORTROLIG_UTLAND === diskresjonskode) && <>Hemmelig adresse - Kode 6</>}
                {Diskresjonskode.FORTROLIG === diskresjonskode && <>Hemmelig adresse - Kode 7</>}
                {!diskresjonskode && <>Hemmelig adresse</>}
            </Heading>
            Denne personen har hemmelig adresse og du må derfor utvise aktsomhet.
        </Alert>
    );
};

export default HemmeligAdresseVarsel;
