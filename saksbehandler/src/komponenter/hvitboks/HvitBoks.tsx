import React, { FunctionComponent, HTMLAttributes } from 'react';
import './hvitboks.less';

type Props = HTMLAttributes<HTMLDivElement>;

const HvitBoks: FunctionComponent<Props> = (props) => {
    const styling = {
        ...props.style,
    };

    return <div className="hvitboks" style={styling} {...props} />;
};

export default HvitBoks;
