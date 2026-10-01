import { Loader, TextField, VStack } from '@navikt/ds-react';
import EksternLenke from '~/EksternLenke/EksternLenke';
import React from 'react';
import { lagreBedriftKID } from '@/services/rest-service';
import { Refusjon } from '~/types';
import { z } from 'zod';
import { Controller, useFormContext } from 'react-hook-form';
import validator from 'norsk-validator';

export const kidOgKontonummerSchema = z.object({
    kontonummer: z.string({ required_error: 'Vi kan ikke finne noe kontonummer på deres virksomhet' }),
    kid: z
        .string()
        .refine((kid) => !kid || validator.kidnummer(kid), { message: 'KID-nummeret er ikke gyldig' })
        .optional(),
});

export type KidOgKontonummerFields = z.infer<typeof kidOgKontonummerSchema>;

export const kidOgKontonummerDefaultValues = (refusjon: Refusjon): Partial<KidOgKontonummerFields> => ({
    kontonummer: refusjon.refusjonsgrunnlag.bedriftKontonummer ?? undefined,
    kid: refusjon.refusjonsgrunnlag.bedriftKid ?? undefined,
});

interface Props {
    refusjon: Refusjon;
}

function KontonummerOgKid(props: Props) {
    const {
        refusjon: { id, sistEndret, åpnetFørsteGang },
    } = props;

    const { control, register, formState, getValues } = useFormContext<KidOgKontonummerFields>();

    return (
        <VStack gap="space-20">
            {åpnetFørsteGang && (
                <>
                    <TextField
                        htmlSize={18}
                        label="Kontonummer"
                        description={
                            <>
                                Hvis kontonummeret ikke stemmer, må det oppdateres hos{' '}
                                <EksternLenke href="https://www.nav.no/arbeidsgiver/endre-kontonummer">
                                    Nav
                                </EksternLenke>
                            </>
                        }
                        size="small"
                        type="text"
                        error={formState.errors.kontonummer?.message}
                        readOnly
                        {...register('kontonummer')}
                    />
                    <Controller
                        name="kid"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                htmlSize={18}
                                label="KID-nummer"
                                size="small"
                                type="text"
                                error={formState.errors.kid?.message}
                                onBlur={() => {
                                    field.onBlur();
                                    const erGyldig = kidOgKontonummerSchema.safeParse({
                                        kid: field.value,
                                        kontonummer: getValues('kontonummer'),
                                    }).success;
                                    lagreBedriftKID(id, sistEndret, erGyldig ? field.value : undefined);
                                }}
                            />
                        )}
                    />
                </>
            )}
            {!åpnetFørsteGang && <Loader size="small" title="Henter kontonummer" />}
        </VStack>
    );
}

export default KontonummerOgKid;
