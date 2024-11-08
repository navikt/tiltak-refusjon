import { FunctionComponent } from 'react';
import { Button } from '@navikt/ds-react';

interface Props {
    setFeilmelding: (feilmelding: string) => void;
    klikkOpprettKorreksjon?: () => Promise<void>;
}

const OpprettKorreksjonVTAOKnapp: FunctionComponent<Props> = ({ setFeilmelding, klikkOpprettKorreksjon }) => {
    return (
        <Button
            variant="secondary"
            onClick={async () => {
                try {
                    if(klikkOpprettKorreksjon !== undefined){
                        await klikkOpprettKorreksjon();
                    }
                } catch (error) {
                    setFeilmelding('Feil ved oppretting av korreksjonsutkast');
                }
            }}
        >
            Opprett korreksjonsutkast
        </Button>
    );
};

export default OpprettKorreksjonVTAOKnapp;
