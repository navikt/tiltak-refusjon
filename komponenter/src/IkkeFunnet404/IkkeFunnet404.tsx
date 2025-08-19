import { Link } from 'react-router-dom';
import { BodyShort, Box, Button, Heading, List, Page, VStack } from '@navikt/ds-react';

import Boks from '~/Boks';
import React from 'react';

interface Props {
    pathTilForside?: string;
    arbeidsgiver?: boolean;
}

function IkkeFunnet404(props: Props) {
    const { pathTilForside = '/', arbeidsgiver = false } = props;

    return (
        <Page.Block as="main" width="xl" gutters>
            <Box paddingBlock="20 16" data-aksel-template="404-v2">
                <Boks variant="hvit">
                    <VStack gap="12" align="start">
                        <div>
                            <Heading level="1" size="large" spacing>
                                Beklager, vi fant ikke siden
                            </Heading>
                            <BodyShort>
                                Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                            </BodyShort>
                            <List>
                                <List.Item>Bruk gjerne søket eller menyen</List.Item>
                                {pathTilForside && (
                                    <List.Item>
                                        <Link to={pathTilForside}>Gå til forsiden</Link>
                                    </List.Item>
                                )}
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

export default IkkeFunnet404;
