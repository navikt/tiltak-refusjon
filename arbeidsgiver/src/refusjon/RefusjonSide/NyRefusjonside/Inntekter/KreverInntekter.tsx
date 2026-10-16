import React, { PropsWithChildren } from 'react';
import { Alert, Heading, Loader, VStack } from '@navikt/ds-react';

import { Refusjon } from '~/types';
import InntektAccordion from './InntektAccordion';

interface Props {
    refusjon: Refusjon;
}

function KreverInntekter(props: PropsWithChildren<Props>) {
    const { refusjon, children } = props;
    const { inntektsgrunnlag } = refusjon.refusjonsgrunnlag;

    if (inntektsgrunnlag?.inntekter.length === 0 && !refusjon.åpnetFørsteGang) {
        return (
            <VStack gap="space-24">
                <Heading level="2" size="small">
                    Inntekter i perioden
                </Heading>
                <Loader type="L" />
            </VStack>
        );
    }

    if (inntektsgrunnlag?.inntekterForPerioden.length === 0) {
        return (
            <VStack gap="space-24">
                <Heading level="2" size="small">
                    Inntekter i perioden
                </Heading>
                <Alert variant="warning" size="small">
                    Vi kan ikke finne noen lønnsinntekter fra a-meldingen for denne perioden. Når a-meldingen er
                    oppdatert vil inntektsopplysningene vises her automatisk.
                </Alert>
                <InntektAccordion refusjon={refusjon} />
            </VStack>
        );
    }

    return children;
}

export default KreverInntekter;
