import { Alert, Link } from '@navikt/ds-react';

const AMeldingBanner = () => {
    return (
        <Alert variant="warning" size="small">
            Hvis a-meldingen ikke kan sendes digitalt, må manuell løsning benyttes. Se veiledning her:{' '}
            <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/a-meldingen/levere/levering-fra-system/"
            >
                A-melding – levering som filvedlegg - Skatteetaten
            </Link>
        </Alert>
    );
};

export default AMeldingBanner;
