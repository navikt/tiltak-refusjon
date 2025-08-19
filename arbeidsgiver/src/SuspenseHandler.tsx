import React, { Suspense } from 'react';
import HenterInntekterBoks from '~/HenterInntekterBoks';

const SuspenseHandler = (props: React.PropsWithChildren) => (
    <Suspense
        fallback={
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <HenterInntekterBoks />
            </div>
        }
    >
        {props.children}
    </Suspense>
);

export default SuspenseHandler;
