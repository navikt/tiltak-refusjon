import { Alert, ConfirmationPanel } from '@navikt/ds-react';
import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, useState } from 'react';
import LagreKnapp from '../../../komponenter/LagreKnapp';
import Utregning from '../../../komponenter/Utregning';
import VerticalSpacer from '~/VerticalSpacer';

import SummeringBoks from '../SummeringBoks';
import './refusjonInnsendingMentor.less';
import { Refusjon } from '~/types/refusjon';
import BEMHelper from '~/utils/bem';
import UtregningMentor from '@/komponenter/UtregningMentor';
import SummeringBoksMentor from '../SummeringBoksMentor';

interface Properties {
    refusjon: Refusjon;
    setVisGodkjennModal: Dispatch<SetStateAction<boolean>>;
    feilmelding?: string;
}

const RefusjonInnsending: FunctionComponent<Properties> = ({
    refusjon,
    setVisGodkjennModal,
    feilmelding,
}: PropsWithChildren<Properties>) => {
    const [bekrefetKorrekteOpplysninger, setBekrefetKorrekteOpplysninger] = useState<boolean>(false);
    const [ikkeBekreftetFeilmelding, setIkkeBekreftetFeilmelding] = useState<string>('');
    const cls = BEMHelper('refusjonInnsending');

    const bekreftOpplysninger = () => {
        setBekrefetKorrekteOpplysninger(!bekrefetKorrekteOpplysninger);
        setIkkeBekreftetFeilmelding('');
    };

    const fullførRefusjon = async (): Promise<void> => {
        if (bekrefetKorrekteOpplysninger) {
            return setVisGodkjennModal(true);
        }
        setIkkeBekreftetFeilmelding('Du må samtykke at opplysningene er riktig, før du kan sende inn skjemaet.');
    };

    return (
        <div className={cls.className}>
            <UtregningMentor tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag} />
            <SummeringBoksMentor
                erForKorreksjon={false}
                refusjonsgrunnlag={refusjon.refusjonsgrunnlag}
                status={refusjon.status}
            />

            <VerticalSpacer rem={1} />

            <ConfirmationPanel
                className={cls.element('panel')}
                onChange={() => bekreftOpplysninger()}
                checked={bekrefetKorrekteOpplysninger}
                label="Jeg bekrefter at opplysningene er korrekte."
                error={ikkeBekreftetFeilmelding}
            >
                NAV og Riksrevisjonen kan iverksette kontroll (for eksempel stikkprøvekontroll) med at midlene nyttes
                etter forutsetningene, jfr. Bevilgningsreglementet av 26.05.2005 § 10, 2. ledd
            </ConfirmationPanel>

            {feilmelding && (
                <>
                    <Alert variant="error">{feilmelding}</Alert>
                    <VerticalSpacer rem={1} />
                </>
            )}

            <LagreKnapp
                variant="primary"
                lagreFunksjon={async () => {
                    if (!feilmelding) {
                        await fullførRefusjon();
                    }
                }}
            >
                Fullfør
            </LagreKnapp>
        </div>
    );
};
export default RefusjonInnsending;
