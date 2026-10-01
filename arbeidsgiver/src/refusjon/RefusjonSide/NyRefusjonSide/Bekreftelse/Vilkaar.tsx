import { BodyShort, Box, Heading, HStack, List, VStack } from '@navikt/ds-react';
import { BriefcaseIcon, CalendarIcon, InformationSquareIcon, WalletIcon } from '@navikt/aksel-icons';

import EksternLenke from '~/EksternLenke/EksternLenke';

function Vilkaar() {
    return (
        <Box borderColor="info" borderRadius="12" borderWidth="1" overflow="hidden">
            <Box
                background="info-moderate"
                borderColor="info-subtleA"
                borderWidth="0 0 1"
                paddingBlock="space-8"
                paddingInline="space-20"
            >
                <HStack align="center" gap="space-8">
                    <InformationSquareIcon aria-hidden fontSize="1.5rem" />
                    <Heading level="2" size="medium">
                        Arbeidsgivers ansvar
                    </Heading>
                </HStack>
            </Box>
            <Box paddingBlock="space-12 space-16" paddingInline="space-20">
                <List>
                    <List.Item icon={<CalendarIcon aria-hidden />} title="Frist for innsending">
                        <VStack gap="space-24">
                            <BodyShort>
                                Siste frist for å sende inn kravet er senest to måneder etter at perioden er over. Hvis
                                fristen ikke holdes, trekkes tilskuddet som er innvilget og dere får ikke utbetalt
                                støtte.
                            </BodyShort>
                            <BodyShort>
                                Dersom deltakeren har hatt fravær med lønn som blir refundert av Nav i perioden,
                                utsettes fristen når dere venter på riktig beløp for refusjon for fravær.
                            </BodyShort>
                        </VStack>
                    </List.Item>
                    <List.Item icon={<WalletIcon aria-hidden />} title="Tilskuddsperiode og refusjon">
                        <VStack gap="space-24">
                            <BodyShort>Tilskuddet reguleres av forskrift for arbeidsmarkedstiltak.</BodyShort>
                            <BodyShort>
                                Nav og Riksrevisjonen kan kontrollere at pengene som blir utbetalt blir brukt riktig,
                                for eksempel ved stikkprøvekontroll, jf. Bevilgningsreglementet av 26.05.2005 § 10, 2.
                                ledd.
                            </BodyShort>
                            <BodyShort>
                                Endringer i avtalen etterbetales ikke, og vil først gjelde for tilskuddsperioder som
                                ikke allerede er godkjent ved tidspunktet for endringen.
                            </BodyShort>
                        </VStack>
                    </List.Item>
                    <List.Item icon={<BriefcaseIcon aria-hidden />} title="Hva sier regelverket?">
                        <VStack gap="space-4">
                            <EksternLenke href="https://lovdata.no/forskrift/2015-12-11-1598">
                                Forskrift om arbeidsmarkedstiltak (tiltaksforskriften)
                            </EksternLenke>
                            <EksternLenke href="https://lovdata.no/nav/rundskriv/r76-12-01">
                                Utfyllende regler til forskriften
                            </EksternLenke>
                        </VStack>
                    </List.Item>
                </List>
            </Box>
        </Box>
    );
}

export default Vilkaar;
