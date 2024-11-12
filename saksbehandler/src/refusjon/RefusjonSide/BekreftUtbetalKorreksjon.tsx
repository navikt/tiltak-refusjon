import { BodyShort, Button } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import BekreftelseModal from '~/bekreftelse-modal/BekreftelseModal';
import { useHentKorreksjon, utbetalKorreksjon } from '../../services/rest-service';
import LagreOgAvbrytKnapp from '@/komponenter/LagreOgAvbrytKnapp';

const BekreftUtbetalKorreksjon: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const [isOpen, setisOpen] = useState(false);
    const korreksjon = useHentKorreksjon(korreksjonId!);

    return (
        <div>
            <Button variant="secondary" onClick={() => setisOpen(true)}>
                Send korreksjon til utbetaling
            </Button>

            <BekreftelseModal
                isOpen={isOpen}
                lukkModal={() => setisOpen(false)}
                tittel="Send korreksjon til utbetaling"
                bekreft={() => utbetalKorreksjon(korreksjonId!)}
                lagreKnapp={
                    <LagreOgAvbrytKnapp
                        lagreFunksjon={() => utbetalKorreksjon(korreksjonId!)}
                        avbryt={() => utbetalKorreksjon(korreksjonId!)}
                    >
                        OK
                    </LagreOgAvbrytKnapp>
                }
            >
                <BodyShort size="small">
                    Korreksjonen vil bli kostnadsført på den samme enheten som den opprinnelige refusjonen. Refusjonen
                    ble kostnadsført på enhet {korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet}.
                </BodyShort>
                <VerticalSpacer rem={1} />
            </BekreftelseModal>
        </div>
    );
};

export default BekreftUtbetalKorreksjon;
