import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BodyShort, Box, Heading, HStack, List, Tag, VStack } from '@navikt/ds-react';

import HemmeligAdresseVarsel from '~/HemmeligAdresseVarsel';
import KontonummerOgKid, {
    kidOgKontonummerDefaultValues,
    KidOgKontonummerFields,
    kidOgKontonummerSchema,
} from '../NyRefusjonside/KontonummerOgKid';
import Bekreftelse, {
    bekreftelseDefaultValues,
    BekreftelseFields,
    bekreftelseSchema,
} from '@/refusjon/RefusjonSide/Bekreftelse';
import Oppsummering from '@/refusjon/RefusjonSide/Oppsummering';
import { Aktsomhet, Refusjon, statusTekst, tiltakstypeTekst } from '~/types';
import { formaterDato } from '~/utils';
import { refusjonsnummer, storForbokstav } from '~/utils/stringUtils';
import MainContainer from '~/Container/MainContainer';
import { usePlaceholderBeregnUtgifter } from '@/services/rest-service';

import Filopplastning from './Filopplastning';
import InkluderingstilskuddSummeringBoks from './InkluderingstilskuddSummeringBoks';
import InkluderingstilskuddUtregning from './InkluderingstilskuddUtregning';
import InkluderingstilskuddVilkaar from './InkluderingstilskuddVilkaar';
import { AVTALTE_UTGIFTER, UtgiftBeløp, Utgiftsberegning } from './utgifter';

interface Props {
    refusjon: Refusjon;
    aktsomhet?: Aktsomhet;
}

type RefusjonFormFields = KidOgKontonummerFields & BekreftelseFields;

const schema = kidOgKontonummerSchema.and(bekreftelseSchema);

// Innsending er deaktivert til backend kan ta imot utgifter og vedlegg
const INNSENDING_STØTTES = false;

const TOM_BEREGNING: Utgiftsberegning = { sumUtgifter: 0, fratrekkOverstigendeBeløp: 0, refusjonsbeløp: 0 };

const InkluderingstilskuddRefusjonside = (props: Props) => {
    const { refusjon, aktsomhet } = props;
    const { tilskuddsgrunnlag, bedriftKontonummer } = refusjon.refusjonsgrunnlag;

    const [valgteUtgiftsnavn, setValgteUtgiftsnavn] = useState<string[]>([]);
    const [beløp, setBeløp] = useState<UtgiftBeløp>({});

    const valgteUtgifter = AVTALTE_UTGIFTER.filter((utgift) => valgteUtgiftsnavn.includes(utgift.navn));
    const { data: beregning = TOM_BEREGNING } = usePlaceholderBeregnUtgifter(refusjon.id, {
        utgifter: valgteUtgifter.map((utgift) => ({ navn: utgift.navn, beløp: beløp[utgift.navn] ?? 0 })),
    });

    const form = useForm<RefusjonFormFields>({
        defaultValues: {
            ...kidOgKontonummerDefaultValues(refusjon),
            ...bekreftelseDefaultValues(),
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });

    return (
        <MainContainer rolle="arbeidsgiver">
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
                                    Refusjonsnr{' '}
                                    {refusjonsnummer({
                                        avtaleNr: tilskuddsgrunnlag.avtaleNr,
                                        løpenummer: tilskuddsgrunnlag.løpenummer,
                                        resendingsnummer: tilskuddsgrunnlag.resendingsnummer,
                                    })}
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
                                <VStack gap="space-12">
                                    <InkluderingstilskuddVilkaar />
                                    <Bekreftelse
                                        knappetekst="Send inn refusjonskrav"
                                        innsendingDeaktivert={!INNSENDING_STØTTES}
                                    >
                                        <List>
                                            <List.Item>Innholdet i refusjonskravet er korrekt</List.Item>
                                            <List.Item>Kravene til arbeidsgiver er lest og forstått</List.Item>
                                        </List>
                                    </Bekreftelse>
                                </VStack>
                            </VStack>
                        </form>
                    </FormProvider>
                </VStack>
            </Box>
        </MainContainer>
    );
};

export default InkluderingstilskuddRefusjonside;
