import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BodyShort, Box, Heading, HStack, Tag, VStack } from '@navikt/ds-react';

import HemmeligAdresseVarsel from '~/HemmeligAdresseVarsel';
import KontonummerOgKid, {
    kidOgKontonummerDefaultValues,
    KidOgKontonummerFields,
    kidOgKontonummerSchema,
} from '@/refusjon/RefusjonSide/NyRefusjonside/KontoummerOgKid/KontonummerOgKid';
import Bekreftelse, {
    bekreftelseDefaultValues,
    BekreftelseFields,
    bekreftelseSchema,
} from '@/refusjon/RefusjonSide/NyRefusjonside/Bekreftelse';
import Oppsummering from '@/refusjon/RefusjonSide/NyRefusjonside/Oppsummering';
import { Aktsomhet, Refusjon, statusTekst, tiltakstypeTekst } from '~/types';
import { formaterDato } from '~/utils';
import { storForbokstav } from '~/utils/stringUtils';
import MainWrapper from '~/MainWrapper';

import Filopplastning from './Filopplastning';
import InkluderingstilskuddSummeringBoks from './InkluderingstilskuddSummeringBoks';
import InkluderingstilskuddUtregning from './InkluderingstilskuddUtregning';
import InkluderingstilskuddVilkaar from './InkluderingstilskuddVilkaar';
import { AVTALTE_UTGIFTER, beregnUtgifter, UtgiftBeløp } from './utgifter';

interface Props {
    refusjon: Refusjon;
    aktsomhet?: Aktsomhet;
}

type RefusjonFormFields = KidOgKontonummerFields & BekreftelseFields;

const schema = kidOgKontonummerSchema.and(bekreftelseSchema);

// Innsending er deaktivert til backend kan ta imot utgifter og vedlegg
const INNSENDING_STØTTES = false;

const InkluderingstilskuddRefusjonside = (props: Props) => {
    const { refusjon, aktsomhet } = props;
    const { tilskuddsgrunnlag, bedriftKontonummer } = refusjon.refusjonsgrunnlag;

    const [valgteUtgiftsnavn, setValgteUtgiftsnavn] = useState<string[]>([]);
    const [beløp, setBeløp] = useState<UtgiftBeløp>({});

    const valgteUtgifter = AVTALTE_UTGIFTER.filter((utgift) => valgteUtgiftsnavn.includes(utgift.navn));
    const beregning = beregnUtgifter(valgteUtgifter, beløp);

    const form = useForm<RefusjonFormFields>({
        defaultValues: {
            ...kidOgKontonummerDefaultValues(refusjon),
            ...bekreftelseDefaultValues(),
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });

    return (
        <MainWrapper rolle="arbeidsgiver" bredde="smal">
            <Box
                background="default"
                padding={{ xs: 'space-16', md: 'space-32' }}
                borderRadius="12"
                borderColor="neutral-subtle"
                borderWidth="1"
            >
                <VStack gap={{ xs: 'space-40', md: 'space-64' }}>
                    <VStack gap="space-24">
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
                        {aktsomhet?.kreverAktsomhet && <HemmeligAdresseVarsel aktsomhet={aktsomhet} />}
                        <Oppsummering refusjon={refusjon} />
                    </VStack>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(() => undefined)} noValidate>
                            <VStack gap={{ xs: 'space-40', md: 'space-64' }}>
                                <Filopplastning
                                    refusjon={refusjon}
                                    utgifter={AVTALTE_UTGIFTER}
                                    valgteUtgiftsnavn={valgteUtgiftsnavn}
                                    setValgteUtgiftsnavn={setValgteUtgiftsnavn}
                                    beløp={beløp}
                                    setBeløp={(navn, verdi) => setBeløp((forrige) => ({ ...forrige, [navn]: verdi }))}
                                    sumUtgifter={beregning.sumUtgifter}
                                />
                                <KontonummerOgKid refusjon={refusjon} />
                                <VStack gap="space-12">
                                    <InkluderingstilskuddSummeringBoks
                                        refusjonsbeløp={beregning.refusjonsbeløp}
                                        kontonummer={bedriftKontonummer}
                                    />
                                    <InkluderingstilskuddUtregning beregning={beregning} />
                                </VStack>
                                <Bekreftelse
                                    vilkaar={<InkluderingstilskuddVilkaar />}
                                    punkter={[
                                        'Innholdet i refusjonskravet er korrekt',
                                        'Kravene til arbeidsgiver er lest og forstått',
                                    ]}
                                    knappetekst="Send inn refusjonskrav"
                                    innsendingDeaktivert={!INNSENDING_STØTTES}
                                />
                            </VStack>
                        </form>
                    </FormProvider>
                </VStack>
            </Box>
        </MainWrapper>
    );
};

export default InkluderingstilskuddRefusjonside;
