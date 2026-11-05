import { Accordion, VStack } from '@navikt/ds-react';

import EksternLenke from '~/EksternLenke/EksternLenke';
import { avtaleLenke } from '~/utils/lenkeUtils';
import VerticalSpacer from '~/VerticalSpacer';

interface Props {
    avtaleId: string;
}

const UtgifterFAQ = ({ avtaleId }: Props) => (
    <VStack>
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>Jeg finner ikke utgiftene jeg leter etter</Accordion.Header>
                <Accordion.Content>
                    Detaljer om hvilke utgifter som dekkes av tilskuddet, finnes i{' '}
                    <EksternLenke href={avtaleLenke(avtaleId, 'ARBEIDSGIVER')}>
                        avtalen om inkluderingstilskudd.
                    </EksternLenke>
                    <VerticalSpacer rem={1} />
                    Dersom du ønsker refusjon for utgifter som ikke er avtalt på forhånd, må du ta kontakt med Nav for å
                    inkludere disse i avtalen før det evt. kan søkes om refusjon.
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Hva menes med “ferdigstilt”?</Accordion.Header>
                <Accordion.Content>
                    Dersom det ikke skal legges til flere utgifter på en post i fremtiden (feks. at det er kjøpt inn en
                    stol på posten “kontorstol”), merkes posten som “ferdigstilt”. Slik at resterende midler fristilles.
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    </VStack>
);

export default UtgifterFAQ;
