import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z, { ZodTypeAny } from 'zod';
import { useNavigate } from 'react-router';
import { BodyShort, Box, Heading, HStack, Tag, VStack } from '@navikt/ds-react';

import HemmeligAdresseVarsel from '~/HemmeligAdresseVarsel';
import RefusjonFullførNullbeløpModal from '@/refusjon/RefusjonSide/refusjonFullførNullbeløp/RefusjonFullførNullbeløpModal';
import RefusjonGodkjennModal from '@/refusjon/RefusjonSide/RefusjonGodkjennModal';
import SummeringBoks from '@/refusjon/RefusjonSide/SummeringBoks';
import { Aktsomhet, Refusjon, statusTekst, tiltakstypeTekst } from '~/types';
import { MainContainer } from '~/Container';
import { formaterDato } from '~/utils';
import { godkjennRefusjon, godkjennRefusjonMedNullbeløp } from '@/services/rest-service';
import { storForbokstav } from '~/utils/stringUtils';

import Bruttolonn, { BruttolonnFields, bruttolonnDefaultValues, lagBruttolonnSchema } from './Bruttolonn';
import Fravaer, { FravaerFields, fravaerDefaultValues, fravaerSchema } from './Fravaer';
import useRefusjonsideSteg, { Seksjon, Steg } from './useRefusjonsideSteg';
import Oppsummering from './Oppsummering';
import { InntektFields, inntektDefaultValues, InntektTabell, inntektSchema, KreverInntekter } from './Inntekter';
import Bekreftelse, { BekreftelseFields, bekreftelseDefaultValues, bekreftelseSchema } from './Bekreftelse';
import Utregning from '~/Utregning';
import KontonummerOgKid, {
    kidOgKontonummerDefaultValues,
    KidOgKontonummerFields,
    kidOgKontonummerSchema,
} from './KontonummerOgKid';

interface Props {
    refusjon: Refusjon;
    aktsomhet?: Aktsomhet;
}

type RefusjonFormFields = FravaerFields & InntektFields & BruttolonnFields & KidOgKontonummerFields & BekreftelseFields;

const schema = (refusjon: Refusjon, seksjon: Record<Seksjon, boolean>) => {
    let schema: ZodTypeAny = z.object({});
    if (seksjon.FRAVAER) {
        schema = schema.and(fravaerSchema);
    }
    if (seksjon.INNTEKT_TABELL) {
        schema = schema.and(inntektSchema);
    }
    if (seksjon.BRUTTOLONN) {
        schema = schema.and(lagBruttolonnSchema(refusjon));
    }
    if (seksjon.KID_OG_KONTONUMMER) {
        schema = schema.and(kidOgKontonummerSchema);
    }
    if (seksjon.BEKREFTELSE) {
        schema = schema.and(bekreftelseSchema);
    }
    return schema;
};

const NyRefusjonside = (props: Props) => {
    const { refusjon, aktsomhet } = props;
    const { tilskuddsgrunnlag } = refusjon.refusjonsgrunnlag;

    const navigate = useNavigate();
    const { steg, seksjon, endreSteg } = useRefusjonsideSteg(refusjon);
    const [visGodkjennModal, setVisGodkjennModal] = useState<boolean>(false);

    const form = useForm<RefusjonFormFields>({
        defaultValues: {
            ...fravaerDefaultValues(refusjon),
            ...inntektDefaultValues(refusjon),
            ...bruttolonnDefaultValues(refusjon),
            ...kidOgKontonummerDefaultValues(refusjon),
            ...bekreftelseDefaultValues(),
        },
        mode: 'onBlur',
        resolver: zodResolver(schema(refusjon, seksjon)),
    });

    const godkjennRefusjonen = async () => {
        if (steg === Steg.NULLBELOP) {
            await godkjennRefusjonMedNullbeløp(refusjon.id, refusjon.sistEndret);
        } else {
            await godkjennRefusjon(refusjon.id, refusjon.sistEndret);
        }
        navigate({ pathname: `/refusjon/${refusjon.id}/kvittering`, search: window.location.search });
    };

    const onFravaerChange = useCallback(
        (change: { erGyldig: boolean }) => {
            endreSteg(change.erGyldig ? Steg.INNTEKTER : Steg.FRAVAER);
        },
        [endreSteg]
    );

    const onInntektChange = useCallback(
        (change: { erGyldig: boolean; belop: number } & InntektFields) => {
            const { erGyldig, belop, harIkkeOpptjentInntekterIPerioden } = change;

            if (!erGyldig) {
                endreSteg(Steg.INNTEKTER);
            } else if (harIkkeOpptjentInntekterIPerioden) {
                endreSteg(belop === 0 ? Steg.NULLBELOP : Steg.MINUSBELOP);
            } else {
                endreSteg(Steg.BEREGNING_OG_BEKREFTELSE);
            }
        },
        [endreSteg]
    );

    return (
        <>
            <MainContainer rolle="arbeidsgiver" bredde="lg">
                <Box background="default" padding={{ xs: 'space-16', md: 'space-32' }}>
                    <VStack gap={{ xs: 'space-40', md: 'space-64' }}>
                        <VStack gap="space-24">
                            <VStack>
                                <HStack align="start" gap="space-16" justify="space-between" wrap>
                                    <div>
                                        <Heading level="1" size="medium">
                                            Refusjonsnr {tilskuddsgrunnlag.avtaleNr}-{tilskuddsgrunnlag.løpenummer}
                                        </Heading>
                                        <BodyShort size="small">
                                            {storForbokstav(tiltakstypeTekst[tilskuddsgrunnlag.tiltakstype])}
                                        </BodyShort>
                                    </div>
                                    <HStack align="center" gap={{ xs: 'space-8', md: 'space-24' }} wrap>
                                        <Tag variant="info">{storForbokstav(statusTekst[refusjon.status])}</Tag>
                                        <Tag variant="warning">Frist {formaterDato(refusjon.fristForGodkjenning)}</Tag>
                                    </HStack>
                                </HStack>
                            </VStack>
                            {aktsomhet?.kreverAktsomhet && <HemmeligAdresseVarsel aktsomhet={aktsomhet} />}
                            <Oppsummering refusjon={refusjon} />
                        </VStack>
                        <KreverInntekter refusjon={refusjon}>
                            <FormProvider {...form}>
                                <form onSubmit={form.handleSubmit(() => setVisGodkjennModal(true))} noValidate>
                                    <VStack gap={{ xs: 'space-40', md: 'space-64' }}>
                                        {seksjon.FRAVAER && <Fravaer refusjon={refusjon} onChange={onFravaerChange} />}
                                        {seksjon.INNTEKT_TABELL && (
                                            <InntektTabell refusjon={refusjon} onChange={onInntektChange} />
                                        )}
                                        {seksjon.BRUTTOLONN && <Bruttolonn refusjon={refusjon} />}
                                        {seksjon.KID_OG_KONTONUMMER && <KontonummerOgKid refusjon={refusjon} />}
                                        {seksjon.UTBETALINGSINFO && (
                                            <SummeringBoks
                                                erForKorreksjon={false}
                                                refusjonsgrunnlag={refusjon.refusjonsgrunnlag}
                                                status={refusjon.status}
                                            />
                                        )}
                                        {seksjon.UTREGNING && (
                                            <Utregning
                                                utregning={refusjon.utregning}
                                                tilskuddsgrunnlag={tilskuddsgrunnlag}
                                                inntektsgrunnlag={refusjon.refusjonsgrunnlag.inntektsgrunnlag}
                                            />
                                        )}
                                        {seksjon.BEKREFTELSE && <Bekreftelse />}
                                    </VStack>
                                </form>
                            </FormProvider>
                        </KreverInntekter>
                    </VStack>
                </Box>
            </MainContainer>
            {visGodkjennModal && steg === Steg.NULLBELOP && (
                <RefusjonFullførNullbeløpModal
                    refusjon={refusjon}
                    visGodkjennModal={visGodkjennModal}
                    setVisGodkjennModal={setVisGodkjennModal}
                    godkjennRefusjonen={godkjennRefusjonen}
                />
            )}
            {visGodkjennModal && steg !== Steg.NULLBELOP && (
                <RefusjonGodkjennModal
                    refusjon={refusjon}
                    visGodkjennModal={visGodkjennModal}
                    setVisGodkjennModal={setVisGodkjennModal}
                    godkjennRefusjonen={godkjennRefusjonen}
                />
            )}
        </>
    );
};

export default NyRefusjonside;
