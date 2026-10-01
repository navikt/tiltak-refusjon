import { BodyShort, HGrid, VStack } from '@navikt/ds-react';
import { formaterPeriode } from '~/utils';
import EksternLenke from '~/EksternLenke/EksternLenke';
import React from 'react';
import { Refusjon } from '~/types';

interface Props {
    refusjon: Refusjon;
}

function Oppsummering(props: Props) {
    const {
        refusjon: {
            refusjonsgrunnlag: { tilskuddsgrunnlag },
        },
    } = props;

    return (
        <VStack gap="space-8">
            <HGrid columns={{ xs: 1, sm: '6.25rem 1fr' }} gap={{ xs: 'space-2', sm: 'space-8' }}>
                <BodyShort weight="semibold">Arbeidsgiver</BodyShort>
                <BodyShort>{tilskuddsgrunnlag.bedriftNavn}</BodyShort>
            </HGrid>
            <HGrid columns={{ xs: 1, sm: '6.25rem 1fr' }} gap={{ xs: 'space-2', sm: 'space-8' }}>
                <BodyShort weight="semibold">Periode</BodyShort>
                <BodyShort>{formaterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}</BodyShort>
            </HGrid>
            <HGrid columns={{ xs: 1, sm: '6.25rem 1fr' }} gap={{ xs: 'space-2', sm: 'space-8' }}>
                <BodyShort weight="semibold">Deltaker</BodyShort>
                <BodyShort>
                    {tilskuddsgrunnlag.deltakerFornavn} {tilskuddsgrunnlag.deltakerEtternavn}
                </BodyShort>
            </HGrid>
            <HGrid columns={{ xs: 1, sm: '6.25rem 1fr' }} gap={{ xs: 'space-2', sm: 'space-8' }}>
                <BodyShort weight="semibold">Avtale</BodyShort>
                <BodyShort>
                    <EksternLenke
                        href={`https://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${tilskuddsgrunnlag.avtaleId}`}
                    >
                        {tilskuddsgrunnlag.avtaleNr}
                    </EksternLenke>
                </BodyShort>
            </HGrid>
        </VStack>
    );
}

export default Oppsummering;
