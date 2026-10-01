import { Label, BodyShort, Box, HStack, VStack } from '@navikt/ds-react';

import { formatterPenger } from '~/utils/PengeUtils';
import { Refusjonsgrunnlag, Tilskuddsgrunnlag } from '~/types/refusjon';
import { RefusjonStatus } from '~/types/status';
import { formaterPeriode } from '~/utils';
import Pengesedler from '@/asset/image/pengesedler.svg?react';
import BrevMedVarsel from '@/asset/image/brev-med-varsel.svg?react';

type Props = {
    refusjonsgrunnlag: Refusjonsgrunnlag;
    status: RefusjonStatus;
    erForKorreksjon: boolean;
};

// Dersom vi vet at dette er siste tilskuddsperiode så vil vi vise alternativ tekst
// som indikerer at man ikke behøver å tilbakebetale beløpet man skylder (med mindre avtale forlenges)
const erSisteTilskuddsperiodeIAvtalen = (tilskuddsgrunnlag: Tilskuddsgrunnlag) =>
    tilskuddsgrunnlag.avtaleTom === tilskuddsgrunnlag.tilskuddTom;

const SummeringBoks = (props: Props) => {
    const {
        status,
        erForKorreksjon,
        refusjonsgrunnlag: { beregning, tilskuddsgrunnlag, bedriftKontonummer },
    } = props;

    if (beregning?.refusjonsbeløp === undefined) {
        return null;
    }

    const { refusjonsbeløp } = beregning;
    const periode = formaterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom);
    const erRefundertBeløpTrukketFra = beregning.sumUtgifter !== beregning.sumUtgifterFratrukketRefundertBeløp;
    const erSisteTilskuddsperiode = erSisteTilskuddsperiodeIAvtalen(tilskuddsgrunnlag);

    if (refusjonsbeløp > 0) {
        return (
            <Box borderColor="accent-subtle" borderRadius="8" borderWidth="3" padding="space-12">
                <HStack align="center" gap="space-20" wrap={false}>
                    <Pengesedler />
                    <VStack gap="space-4">
                        <Label>Dere får utbetalt</Label>
                        <BodyShort size="small">
                            <b>{formatterPenger(refusjonsbeløp)}</b> for perioden {periode} til kontonummer{' '}
                            {bedriftKontonummer}
                        </BodyShort>
                    </VStack>
                </HStack>
            </Box>
        );
    }

    if (refusjonsbeløp < 0) {
        return (
            <Box borderColor="accent-subtle" borderRadius="8" borderWidth="3" padding="space-12">
                <HStack align="center" gap="space-20" wrap={false}>
                    <Pengesedler />
                    <VStack gap="space-4">
                        {beregning.lønnFratrukketFerie < 0 && (
                            <>
                                {erSisteTilskuddsperiode ? (
                                    <BodyShort size="small">
                                        Fratrekk for ferie er større enn bruttolønn i perioden. Ettersom tiltaket er
                                        avsluttet vil dette beløpet bli sett bort fra.
                                        <br />
                                        Dersom tiltaket forlenges vil beløpet trekkes fra neste periode.
                                    </BodyShort>
                                ) : (
                                    <BodyShort size="small">
                                        Siden fratrekk for ferie er større enn bruttolønn i perioden vil det negative
                                        refusjonsbeløpet overføres til neste periode.
                                    </BodyShort>
                                )}
                                {erRefundertBeløpTrukketFra && (
                                    <BodyShort size="small">
                                        Vi tar ikke hensyn til oppgitt refunderbar lønn (
                                        {formatterPenger(beregning.tidligereRefundertBeløp)}) ved negativt
                                        refusjonsbeløp. Dette er altså ikke med i beregnet refusjonsbeløp.
                                    </BodyShort>
                                )}
                                {status === 'KLAR_FOR_INNSENDING' && (
                                    <Label>Dere må fortsatt trykke fullfør under.</Label>
                                )}
                            </>
                        )}
                        {erSisteTilskuddsperiode ? (
                            <BodyShort size="small">
                                Dere skylder{' '}
                                <b style={{ textDecoration: 'line-through' }}>
                                    {formatterPenger(Math.abs(refusjonsbeløp))}
                                </b>{' '}
                                <b>{formatterPenger(0)}</b> for perioden {periode}.
                            </BodyShort>
                        ) : (
                            <BodyShort size="small">
                                Dere skylder <b>{formatterPenger(Math.abs(refusjonsbeløp))}</b> for perioden {periode}.{' '}
                                {erForKorreksjon ? 'Beløpet vil tilbakekreves' : 'Dette vil trekkes fra neste refusjon'}
                                .
                            </BodyShort>
                        )}
                    </VStack>
                </HStack>
            </Box>
        );
    }

    if (status !== 'KLAR_FOR_INNSENDING') {
        return (
            <Box borderColor="accent-subtle" borderRadius="8" borderWidth="3" padding="space-12">
                <HStack align="center" gap="space-20" wrap={false}>
                    <BrevMedVarsel />
                    <Label>
                        Refusjonen er godtatt med {formatterPenger(0)} for perioden {periode}
                    </Label>
                </HStack>
            </Box>
        );
    }

    if (erRefundertBeløpTrukketFra) {
        return (
            <Box borderColor="accent-subtle" borderRadius="8" borderWidth="3" padding="space-12">
                <HStack align="center" gap="space-20" wrap={false}>
                    <Pengesedler />
                    <VStack gap="space-4">
                        <BodyShort size="small">
                            Oppgitt refunderbar lønn <b>({formatterPenger(beregning.tidligereRefundertBeløp)})</b> gir
                            et negativt refusjonsgrunnlag og refusjonsbeløpet settes da til {formatterPenger(0)}.
                        </BodyShort>
                        <Label>
                            Godta <b>{formatterPenger(refusjonsbeløp)}</b> for perioden {periode} ved å trykke fullfør
                            under.
                        </Label>
                    </VStack>
                </HStack>
            </Box>
        );
    }

    return (
        <Box borderColor="accent-subtle" borderRadius="8" borderWidth="3" padding="space-12">
            <HStack align="center" gap="space-20" wrap={false}>
                <BrevMedVarsel />
                <VStack gap="space-4">
                    <Label>Refusjonen sendes inn med nullbeløp</Label>
                    <BodyShort>
                        Det utbetales {formatterPenger(0)} for perioden {periode}
                    </BodyShort>
                </VStack>
            </HStack>
        </Box>
    );
};

export default SummeringBoks;
