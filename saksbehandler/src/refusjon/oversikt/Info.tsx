import React, { FunctionComponent, PropsWithChildren } from 'react';
import InfoIkon from '@/asset/image/info.svg?react';
import { Heading } from '@navikt/ds-react';

import styles from './Info.module.less';

const Info: FunctionComponent<{ tekst: string }> = (props: PropsWithChildren<{ tekst: string }>) => (
    <div className={styles.avrundetHvitBoks}>
        <InfoIkon />
        <Heading size="small">{props.tekst}</Heading>
    </div>
);

export default Info;
