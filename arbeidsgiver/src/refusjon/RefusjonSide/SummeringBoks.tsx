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

    if (beregning?.refusjonsbeløp > 0) {
        return (
            <Box borderColor="accent-subtle" borderRadius="8" borderWidth="3" padding="space-12">
                <HStack align="center" gap="space-20" wrap={false}>
                    <Pengesedler />
                    <VStack gap="space-4">
                        <Label>Dere får utbetalt</Label>
                        <BodyShort size="small">
                            <b>{formatterPenger(beregning?.refusjonsbeløp || 0)}</b> for perioden{' '}
                            {formaterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)} til
                            kontonummer {bedriftKontonummer}
                        </BodyShort>
                    </VStack>
                </HStack>
            </Box>
        );
    }

    if (beregning?.refusjonsbeløp < 0) {
        return (
            <Box borderColor="accent-subtle" borderRadius="8" borderWidth="3" padding="space-12">
                <HStack align="center" gap="space-20" wrap={false}>
                    <Pengesedler />
                    <VStack gap="space-4">
                        {beregning.lønnFratrukketFerie < 0 && (
                            <>
                                {erSisteTilskuddsperiodeIAvtalen(tilskuddsgrunnlag) ? (
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

                                <BodyShort size="small">
                                    {beregning.sumUtgifter !== beregning?.sumUtgifterFratrukketRefundertBeløp && (
                                        <>
                                            Vi tar ikke hensyn til oppgitt refunderbar lønn (
                                            {formatterPenger(beregning?.tidligereRefundertBeløp)}) ved negativt
                                            refusjonsbeløp. Dette er altså ikke med i beregnet refusjonsbeløp.{' '}
                                        </>
                                    )}
                                </BodyShort>
                                <Label>
                                    {props.status === 'KLAR_FOR_INNSENDING' && 'Dere må fortsatt trykke fullfør under.'}
                                </Label>
                            </>
                        )}
                        {erSisteTilskuddsperiodeIAvtalen(tilskuddsgrunnlag) ? (
                            <BodyShort size="small">
                                Dere skylder{' '}
                                <b style={{ textDecoration: 'line-through' }}>
                                    {formatterPenger(Math.abs(beregning?.refusjonsbeløp || 0))}
                                </b>{' '}
                                <b>{formatterPenger(0)}</b> for perioden{' '}
                                {formaterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}.
                            </BodyShort>
                        ) : (
                            <BodyShort size="small">
                                Dere skylder <b>{formatterPenger(Math.abs(beregning?.refusjonsbeløp || 0))}</b> for
                                perioden {formaterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}
                                .{' '}
                                {erForKorreksjon ? 'Beløpet vil tilbakekreves' : 'Dette vil trekkes fra neste refusjon'}
                                .
                            </BodyShort>
                        )}
                    </VStack>
                </HStack>
            </Box>
        );
    }

    return (
        <Box borderColor="accent-subtle" borderRadius="8" borderWidth="3" padding="space-12">
            <HStack align="center" gap="space-20" wrap={false}>
                {status === 'KLAR_FOR_INNSENDING' &&
                    beregning.sumUtgifter === beregning?.sumUtgifterFratrukketRefundertBeløp && (
                        <>
                            <BrevMedVarsel />
                            <VStack gap="space-4">
                                <Label>Refusjonen sendes inn med nullbeløp</Label>
                                <BodyShort>
                                    Det utbetales {formatterPenger(0)} for perioden{' '}
                                    {formaterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}
                                </BodyShort>
                            </VStack>
                        </>
                    )}
                {status === 'KLAR_FOR_INNSENDING' &&
                    beregning.sumUtgifter !== beregning?.sumUtgifterFratrukketRefundertBeløp && (
                        <>
                            <Pengesedler />
                            <VStack gap="space-4">
                                <BodyShort size="small">
                                    Oppgitt refunderbar lønn{' '}
                                    <b>({formatterPenger(beregning?.tidligereRefundertBeløp)})</b> gir et negativt
                                    refusjonsgrunnlag og refusjonsbeløpet settes da til {formatterPenger(0)}.
                                </BodyShort>
                                <Label>
                                    Godta <b>{formatterPenger(beregning?.refusjonsbeløp || 0)}</b> for perioden{' '}
                                    {formaterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)} ved
                                    å trykke fullfør under.
                                </Label>
                            </VStack>
                        </>
                    )}
                {props.status !== 'KLAR_FOR_INNSENDING' && (
                    <>
                        <BrevMedVarsel />
                        <VStack gap="space-4">
                            <Label>
                                Refusjonen er godtatt med {formatterPenger(0)} for perioden{' '}
                                {formaterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}
                            </Label>
                        </VStack>
                    </>
                )}
            </HStack>
        </Box>
    );
};

export default SummeringBoks;
