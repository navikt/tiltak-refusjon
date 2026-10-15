import React, { PropsWithChildren } from 'react';

import { useInnhold } from '~/Container/InnholdContext';
import { Page } from '@navikt/ds-react';

interface Props {
    as?: React.ElementType;
}

function InnholdContainer(props: PropsWithChildren<Props>) {
    const { children, as = 'div' } = props;
    const { innholdBredde } = useInnhold();

    return (
        <Page.Block as={as} width={innholdBredde} gutters>
            {children}
        </Page.Block>
    );
}

export default InnholdContainer;
