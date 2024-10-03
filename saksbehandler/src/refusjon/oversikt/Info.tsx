import styled from 'styled-components';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import InfoIkon from '@/asset/image/info.svg?react';
import { Heading } from '@navikt/ds-react';

const AvrundetHvitBoks = styled.div`
    border-radius: 4px;
    background-color: white;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    > * {
        margin-right: 1rem;
    }
`;

const Info: FunctionComponent<{ tekst: string }> = (props: PropsWithChildren<{ tekst: string }>) => (
    <AvrundetHvitBoks>
        <InfoIkon />
        <Heading size="small">{props.tekst}</Heading>
    </AvrundetHvitBoks>
);

export default Info;
