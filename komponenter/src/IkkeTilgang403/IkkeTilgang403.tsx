import React from 'react';
import { BodyShort, Box, Heading, List, Page, VStack, Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';

import Boks from '~/Boks';
import { Feilkode, Feilmeldinger } from '~/feilkodemapping';

interface Props {
    feilmelding?: string;
    pathTilForside?: string;
    arbeidsgiver?: boolean;
    enkelVisning?: boolean;
}

function IkkeTilgang403(props: Props) {
    const { pathTilForside = '/', arbeidsgiver = false, enkelVisning = false } = props;

    const feilmelding = Feilmeldinger[props.feilmelding as Feilkode] ?? props.feilmelding;

    if (enkelVisning) {
        return (
            <Boks variant="hvit">
                <VStack gap="12" align="start">
                    <div>
                        <Heading level="1" size="large" spacing>
                            Ikke tilgang
                        </Heading>
                        <BodyShort>{feilmelding}</BodyShort>
                    </div>
                </VStack>
            </Boks>
        );
    }

    return (
        <Page.Block as="main" width="xl" gutters>
            <Box paddingBlock="20 16">
                <Boks variant="hvit">
                    <VStack gap="12" align="start">
                        <div>
                            <Heading level="1" size="large" spacing>
                                Ikke tilgang
                            </Heading>
                            <BodyShort>{feilmelding ?? 'Du har ikke tilgang til denne ressursen'}</BodyShort>
                            <List>
                                <List.Item>
                                    <Link to={pathTilForside}>Gå til forsiden</Link>
                                </List.Item>
                            </List>
                        </div>
                        {arbeidsgiver && (
                            <Button as="a" href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver">
                                Gå til Min side
                            </Button>
                        )}
                    </VStack>
                </Boks>
            </Box>
        </Page.Block>
    );
}

export default IkkeTilgang403;
