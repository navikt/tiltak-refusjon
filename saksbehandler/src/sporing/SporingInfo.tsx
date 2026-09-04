import { BodyShort, Box, HStack, ReadMore, Switch, VStack } from '@navikt/ds-react';
import { settSporingsvalg, useSporingAktiv } from './sporingsvalg';
import './SporingInfo.less';

function SporingInfo() {
    const sporingAktiv = useSporingAktiv();

    return (
        <Box
            as="footer"
            className="sporing-info"
            background="raised"
            borderColor="neutral-subtle"
            borderWidth="1 0 0 0"
            padding="space-16"
        >
            <VStack gap="space-8">
                <HStack gap="space-16" align="center" justify="space-between" wrap>
                    <BodyShort size="small">
                        Vi samler inn statistikk om hvordan løsningen brukes, slik at vi kan forbedre den.
                    </BodyShort>
                    <Switch
                        size="small"
                        checked={sporingAktiv}
                        onChange={(event) => settSporingsvalg(event.target.checked)}
                    >
                        Samle statistikk
                    </Switch>
                </HStack>
                <ReadMore size="small" header="Hva samler vi inn?">
                    <VStack gap="space-8">
                        <BodyShort size="small">
                            Vi registrerer hvilke sider som blir åpnet, hvilken type side det er, og hvilken side du kom
                            fra. Fødselsnummer og NAV-ident blir fjernet før dataene sendes, og vi lagrer ikke søkeord
                            eller annet innhold fra adressefeltet.
                        </BodyShort>
                        <BodyShort size="small">
                            Statistikken brukes til å forbedre løsningen, ikke til å følge med på den enkelte
                            saksbehandler. Du kan skru den av når du vil. Valget lagres i nettleseren din.
                        </BodyShort>
                    </VStack>
                </ReadMore>
            </VStack>
        </Box>
    );
}

export default SporingInfo;
