import React from 'react';

import { Aktsomhet } from '~/types';
import { useRefusjonKreverAktsomhet } from '@/services/rest-service';

interface Props {
    refusjonId?: string;
    children: (aktsomhet?: Aktsomhet) => React.ReactNode;
}

function AktsomhetWrapper(props: Props) {
    const { refusjonId, children } = props;
    const { data: aktsomhet } = useRefusjonKreverAktsomhet(refusjonId);
    return children(aktsomhet);
}

export default AktsomhetWrapper;
