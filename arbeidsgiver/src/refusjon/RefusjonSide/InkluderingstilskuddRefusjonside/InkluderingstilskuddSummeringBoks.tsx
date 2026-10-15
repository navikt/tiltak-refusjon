import { BodyShort, Box, HStack, Label, VStack } from '@navikt/ds-react';

import Pengesedler from '@/asset/image/pengesedler.svg?react';
import { formatterPenger } from '~/utils/PengeUtils';

interface Props {
    refusjonsbeløp: number;
    kontonummer?: string;
}

const InkluderingstilskuddSummeringBoks = ({ refusjonsbeløp, kontonummer }: Props) => (
    <Box borderColor="accent-subtle" borderRadius="8" borderWidth="3" padding="space-12">
        <HStack align="center" gap="space-20" wrap={false}>
            <Pengesedler aria-hidden />
            <VStack gap="space-4">
                <Label>Det utbetales {formatterPenger(refusjonsbeløp)}</Label>
                {kontonummer && <BodyShort size="small">Til kontonummer {kontonummer}</BodyShort>}
            </VStack>
        </HStack>
    </Box>
);

export default InkluderingstilskuddSummeringBoks;
