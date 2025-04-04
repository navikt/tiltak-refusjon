import TilEkstern from '@/asset/image/ekstern-lenke.svg?react';
import React from 'react';
import './EksternLenke.less';

import { Link, LinkProps } from '@navikt/ds-react';
import { eksternlenkerTrykket } from '~/utils/amplitude-utils';

const EksternLenke: React.FunctionComponent<LinkProps> = (props) => {
    const onClick = () => {
        if (props.href !== undefined) {
            eksternlenkerTrykket(props.href);
        }
    };

    return (
        <Link target="_blank" onClick={onClick} {...props}>
            {props.children}
            <TilEkstern className="ekstern-lenke-icon" />
        </Link>
    );
};

export default EksternLenke;
