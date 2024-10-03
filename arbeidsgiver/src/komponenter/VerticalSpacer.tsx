import React, { FunctionComponent } from 'react';

type Props = {
    rem: number;
};

const VerticalSpacer: FunctionComponent<Props> = (props) => {
    return <div style={{ marginTop: props.rem + 'rem' }} />;
};

export default VerticalSpacer;
