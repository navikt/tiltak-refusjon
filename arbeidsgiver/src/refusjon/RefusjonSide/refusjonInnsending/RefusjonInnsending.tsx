import { Alert, ConfirmationPanel } from '@navikt/ds-react';
import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, useState } from 'react';
import LagreKnapp from '../../../komponenter/LagreKnapp';
import Utregning from '../../../komponenter/Utregning';
import VerticalSpacer from '~/VerticalSpacer';

import SummeringBoks from '../SummeringBoks';
import './refusjonInnsending.less';
import { Refusjon } from '~/types/refusjon';
import BEMHelper from '~/utils/bem';

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

    if (
        !refusjon.harTattStillingTilAlleInntektslinjer ||
        !refusjon.refusjonsgrunnlag.beregning ||
        typeof refusjon.refusjonsgrunnlag.fratrekkRefunderbarBeløp !== 'boolean' ||
        (refusjon.refusjonsgrunnlag.fratrekkRefunderbarBeløp === true &&
            refusjon.refusjonsgrunnlag.refunderbarBeløp === null) ||
        typeof refusjon.refusjonsgrunnlag.inntekterKunFraTiltaket !== 'boolean'
    ) {
        return null;
    }
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
            <Utregning
                refusjonsnummer={{
                    avtalenr: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
                    løpenummer: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
                }}
                erKorreksjon={false}
                forrigeRefusjonMinusBeløp={refusjon.refusjonsgrunnlag?.forrigeRefusjonMinusBeløp || 0}
                beregning={refusjon.refusjonsgrunnlag.beregning}
                tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                inntektsgrunnlag={refusjon.refusjonsgrunnlag.inntektsgrunnlag}
                sumUtbetaltVarig={refusjon.refusjonsgrunnlag.sumUtbetaltVarig}
            />
            <SummeringBoks
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
