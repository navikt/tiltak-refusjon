import React from 'react';
import './AdvarselBannerTestversjon.less';

import { Alert } from '@navikt/ds-react';
import BEMHelper from '~/utils/bem';

const cls = BEMHelper('advarsel-banner-testversjon');

const AdvarselBannerTestversjon = () => {
    return (
        <>
            {window.location.hostname.includes('-labs') && (
                <Alert variant="warning" size="small" className={cls.className}>
                    <b>Dette er en testversjon</b>
                    <br />
                    Her kan du bli bedre kjent med løsningen for tiltaksrefusjon.
                    <br />
                    Hvis du er arbeidsgiver logger du deg på her: tiltak-refusjon.nav.no
                </Alert>
            )}
        </>
    );
};

export default AdvarselBannerTestversjon;
