import React, { useEffect } from 'react';
import { BodyShort, LocalAlert, Radio, RadioGroup, ReadMore, TextField, VStack } from '@navikt/ds-react';
import { z } from 'zod';
import { useFormContext, useWatch, Controller } from 'react-hook-form';

import { Refusjon, tiltakstypeTekst } from '~/types';
import { settTidligereRefunderbarBeløp } from '@/services/rest-service';
import { formaterDato } from '~/utils';

export const fravaerSchema = z
    .object({
        fravaer: z.boolean({ required_error: 'Du må svare på om deltakeren har hatt fravær' }),
        refundert: z.boolean().nullable(),
        belop: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.fravaer && data.refundert === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['refundert'],
                message: 'Du må svare på om beløpet har blitt refundert',
            });
        }

        if (data.fravaer && data.refundert === false) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['refundert'],
                message: 'Beløpet må være refundert for å kunne sende inn refusjonen',
            });
        }

        if (data.fravaer && data.refundert && !data.belop) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['belop'],
                message: 'Du må oppgi beløpet',
            });
        }

        if (data.belop && !/^\d*$/.test(data.belop)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['belop'],
                message: 'Beløpet må kun bestå av tall',
            });
        }
    });

export type FravaerFields = z.infer<typeof fravaerSchema>;

export const fravaerDefaultValues = (refusjon: Refusjon): Partial<FravaerFields> => {
    const { fratrekkRefunderbarBeløp, refunderbarBeløp } = refusjon.refusjonsgrunnlag;
    return {
        fravaer: fratrekkRefunderbarBeløp ?? undefined,
        refundert: fratrekkRefunderbarBeløp && refunderbarBeløp ? true : null,
        belop: refunderbarBeløp?.toString() ?? '',
    };
};

interface Props {
    refusjon: Refusjon;
    onChange: (endring: { erGyldig: boolean }) => void;
}

function Fravaer(props: Props) {
    const {
        refusjon: { id, sistEndret, refusjonsgrunnlag, fristForGodkjenning },
        onChange,
    } = props;

    const { control, formState, resetField } = useFormContext<FravaerFields>();
    const [harFravaer, erRefundert, belop] = useWatch({ control, name: ['fravaer', 'refundert', 'belop'] });
    const tiltakstypeSomTekst = tiltakstypeTekst[refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype];
    const erGyldig = fravaerSchema.safeParse({ fravaer: harFravaer, refundert: erRefundert, belop }).success;

    useEffect(() => {
        onChange({ erGyldig });
    }, [erGyldig, onChange]);

    return (
        <VStack gap="space-20">
            <VStack gap="space-4">
                <Controller
                    name="fravaer"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            value={field.value ?? null}
                            legend="Har deltaker hatt fravær med lønn som blir refundert av Nav i denne perioden?"
                            size="small"
                            error={formState.errors.fravaer?.message}
                            onChange={(value) => {
                                field.onChange(value);
                                if (!value) {
                                    settTidligereRefunderbarBeløp(id, false, sistEndret, null);
                                }
                                resetField('refundert', { defaultValue: null });
                                resetField('belop', { defaultValue: '' });
                            }}
                        >
                            <Radio value={true}>Ja</Radio>
                            <Radio value={false}>Nei</Radio>
                        </RadioGroup>
                    )}
                />
                <ReadMore header="Hva betyr dette?" size="small">
                    <VStack gap="space-24">
                        <BodyShort>
                            Hvis dere har fått utbetalt refusjon for fravær, som sykepenger, må dette beløpet trekkes
                            fra refusjonen for {tiltakstypeSomTekst}. Trekket skal være det beløpet dere har fått fra
                            Nav.
                        </BodyShort>
                        <BodyShort>
                            Aktuelle refusjoner fra Nav kan være sykepenger, foreldrepenger, omsorgspenger,
                            svangerskapspenger, opplæringspenger eller pleiepenger.
                        </BodyShort>
                    </VStack>
                </ReadMore>
            </VStack>
            {harFravaer && (
                <Controller
                    name="refundert"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            legend="Har beløpet blitt refundert?"
                            size="small"
                            error={erRefundert !== false ? formState.errors.refundert?.message : undefined}
                            onChange={(value) => {
                                field.onChange(value);
                                settTidligereRefunderbarBeløp(id, !value, sistEndret, null);
                                resetField('belop', { defaultValue: '' });
                            }}
                        >
                            <Radio value={true} description="Beløpet er mottatt">
                                Ja
                            </Radio>
                            <Radio
                                value={false}
                                description="Vi venter på beløpet, eller det er ikke søkt om refusjon enda"
                            >
                                Nei
                            </Radio>
                        </RadioGroup>
                    )}
                />
            )}
            {harFravaer && erRefundert && (
                <Controller
                    name="belop"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            htmlSize={18}
                            inputMode="numeric"
                            label="Refusjonsbeløpet på grunn av fravær"
                            error={formState.errors.belop?.message}
                            size="small"
                            onBlur={(e) => {
                                field.onBlur();
                                settTidligereRefunderbarBeløp(
                                    id,
                                    true,
                                    sistEndret,
                                    parseInt(e.currentTarget.value, 10)
                                );
                            }}
                        />
                    )}
                />
            )}
            {erRefundert === false && (
                <LocalAlert status="success">
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            Frist for innsending utsettes til {formaterDato(fristForGodkjenning)}
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        <BodyShort spacing>
                            Fristen er automatisk utsatt mens dere venter på riktig beløp for refusjon for fravær.
                        </BodyShort>
                        <BodyShort spacing>
                            Refusjonen for midlertidig lønnstilskudd kan fylles ut og sendes inn etter beløpet er
                            mottatt.
                        </BodyShort>
                        <BodyShort spacing>
                            Dersom dere har søkt om refusjon for fravær og venter på riktig beløp, må dere vente med å
                            fylle ut refusjonen for {tiltakstypeSomTekst}.
                        </BodyShort>
                    </LocalAlert.Content>
                </LocalAlert>
            )}
        </VStack>
    );
}

export default Fravaer;
