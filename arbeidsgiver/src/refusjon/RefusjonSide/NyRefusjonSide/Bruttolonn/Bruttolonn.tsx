import { Refusjon, tiltakstypeTekst } from '~/types';
import React from 'react';
import { Radio, RadioGroup, TextField, VStack } from '@navikt/ds-react';
import { endreBruttolønn } from '@/services/rest-service';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { sumInntekterOpptjentIPeriode } from '@/utils/inntekterUtiles';

export const lagBruttolonnSchema = (refusjon: Refusjon) =>
    z
        .object({
            harAndreRefusjoner: z.boolean({
                required_error: 'Du må svare på om inntektene er tilknyttet andre refusjoner',
            }),
            erBruttolonnKorrekt: z.boolean().nullable(),
            bruttolonn: z.string().optional(),
        })
        .superRefine((data, ctx) => {
            if (data.harAndreRefusjoner && data.erBruttolonnKorrekt === null) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['erBruttolonnKorrekt'],
                    message: 'Du må svare på om utregnet bruttolønn er korrekt',
                });
            }

            if (data.harAndreRefusjoner && data.erBruttolonnKorrekt === false && !data.bruttolonn) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['bruttolonn'],
                    message: 'Du må oppgi bruttolønn',
                });
            }

            if (data.bruttolonn && !/^\d*$/.test(data.bruttolonn)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['bruttolonn'],
                    message: 'Bruttolønn kan kun bestå av tall',
                });
            }

            const sumInntekterOpptjent = refusjon.refusjonsgrunnlag.inntektsgrunnlag
                ? sumInntekterOpptjentIPeriode(refusjon.refusjonsgrunnlag.inntektsgrunnlag)
                : 0;
            if (data.bruttolonn && parseInt(data.bruttolonn, 10) > sumInntekterOpptjent) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['bruttolonn'],
                    message: `Beløpet er høyre enn sum bruttolønn. Det må være det samme eller lavere enn ${sumInntekterOpptjent} kr.`,
                });
            }
        });

export type BruttolonnFields = z.infer<ReturnType<typeof lagBruttolonnSchema>>;

const bruttolonnFeltnavn: (keyof BruttolonnFields)[] = ['harAndreRefusjoner', 'erBruttolonnKorrekt', 'bruttolonn'];

export const bruttolonnDefaultValues = (refusjon: Refusjon): Partial<BruttolonnFields> => {
    const { inntekterKunFraTiltaket, endretBruttoLønn } = refusjon.refusjonsgrunnlag;
    return {
        harAndreRefusjoner: typeof inntekterKunFraTiltaket === 'boolean' ? !inntekterKunFraTiltaket : undefined,
        erBruttolonnKorrekt: endretBruttoLønn ? false : null,
        bruttolonn: endretBruttoLønn?.toString() ?? '',
    };
};

interface Props {
    refusjon: Refusjon;
}

const Bruttolonn = (props: Props) => {
    const { refusjon } = props;
    const { id, sistEndret, refusjonsgrunnlag } = refusjon;

    const { control, formState, trigger, getValues, resetField } = useFormContext<BruttolonnFields>();

    const [harAndreRefusjoner, erBruttolonnKorrekt] = useWatch({
        control,
        name: ['harAndreRefusjoner', 'erBruttolonnKorrekt'],
    });
    const tiltakstypeSomTekst = tiltakstypeTekst[refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype];

    return (
        <VStack gap="space-12">
            <Controller
                name="harAndreRefusjoner"
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        {...field}
                        legend={`Er noen av de valgte inntektene tilknyttet andre refusjoner for ${tiltakstypeSomTekst}?`}
                        error={formState.errors.harAndreRefusjoner?.message}
                        size="small"
                        onChange={(value) => {
                            field.onChange(value);
                            if (!value) {
                                endreBruttolønn(id, true, sistEndret, undefined);
                            }
                            resetField('erBruttolonnKorrekt', { defaultValue: null });
                            resetField('bruttolonn', { defaultValue: '' });
                        }}
                    >
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RadioGroup>
                )}
            />
            {harAndreRefusjoner && (
                <Controller
                    name="erBruttolonnKorrekt"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            legend="Er utregnet bruttolønn korrekt?"
                            size="small"
                            error={formState.errors.erBruttolonnKorrekt?.message}
                            onChange={(value) => {
                                field.onChange(value);
                                if (value) {
                                    endreBruttolønn(id, true, sistEndret, undefined);
                                }
                                resetField('bruttolonn', { defaultValue: '' });
                            }}
                        >
                            <Radio value={true}>Ja</Radio>
                            <Radio value={false}>Nei</Radio>
                        </RadioGroup>
                    )}
                />
            )}
            {erBruttolonnKorrekt === false && (
                <Controller
                    name="bruttolonn"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            htmlSize={18}
                            inputMode="numeric"
                            label={`Skriv inn bruttolønn utbetalt for perioden med ${tiltakstypeSomTekst}`}
                            error={formState.errors.bruttolonn?.message}
                            onBlur={async () => {
                                field.onBlur();
                                const isValid = await trigger(bruttolonnFeltnavn);
                                const belop = getValues('bruttolonn');
                                endreBruttolønn(id, !isValid, sistEndret, isValid ? Number(belop) : undefined);
                            }}
                            size="small"
                        />
                    )}
                />
            )}
        </VStack>
    );
};
export default Bruttolonn;
