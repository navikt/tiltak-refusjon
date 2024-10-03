import TilEkstern from '@/asset/image/ekstern-lenke.svg?react';
import React from 'react';
import './EksternLenke.less';
import { Link, LinkProps } from '@navikt/ds-react';

const EksternLenke: React.FunctionComponent<LinkProps> = (props) => {
    const onClick = (event: any) => {};

    return (
        <Link target="_blank" onClick={onClick} {...props}>
            {props.children}
            <TilEkstern className="ekstern-lenke-icon" />
        </Link>
    );
};

export default EksternLenke;
