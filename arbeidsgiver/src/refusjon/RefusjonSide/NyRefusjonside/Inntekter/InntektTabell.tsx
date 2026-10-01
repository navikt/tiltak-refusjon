import React, { Fragment, useEffect, useState } from 'react';
import { BodyShort, Box, Checkbox, Heading, HStack, InlineMessage, Label, Table, VStack } from '@navikt/ds-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Inntektslinje, Refusjon, tiltakstypeTekst } from '~/types';
import { formaterDato, formaterPeriode, månedsNavn, NORSK_DATO_OG_TID_FORMAT, NORSK_DATO_MÅNED_FORMAT } from '~/utils';
import { formatterPenger } from '~/utils/PengeUtils';
import { inntektBeskrivelse } from '@/refusjon/RefusjonSide/inntektsmelding/InntekterFraAMeldingen';
import { setInntektslinjerOpptjentIPeriode } from '@/services/rest-service';
import { storForbokstav } from '~/utils/stringUtils';

import InntektAccordion from './InntektAccordion';
import {
    Inntektsendring,
    oppdaterInntektslinjeOpptjentIPeriode,
    harOpptjentInntekterIPerioden,
    erInntektLike,
} from './inntekt.utils';

export const inntektSchema = z
    .object({
        harOpptjentInntektIPerioden: z.boolean(),
        harIkkeOpptjentInntekterIPerioden: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
        if (!data.harOpptjentInntektIPerioden && !data.harIkkeOpptjentInntekterIPerioden) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['harIkkeOpptjentInntekterIPerioden'],
                message: 'Du må velge minst én inntekt eller bekrefte at det ikke er opptjent inntekter i perioden',
            });
        }
    });

export type InntektFields = z.infer<typeof inntektSchema>;

export const inntektDefaultValues = (refusjon: Refusjon): InntektFields => {
    const {
        refusjonsgrunnlag: { inntektsgrunnlag },
    } = refusjon;

    return {
        harOpptjentInntektIPerioden: harOpptjentInntekterIPerioden(inntektsgrunnlag?.inntekter ?? []),
        harIkkeOpptjentInntekterIPerioden: undefined,
    };
};

interface Props {
    refusjon: Refusjon;
    onChange: (change: { erGyldig: boolean; belop: number } & InntektFields) => void;
}

const settVerdiOpts = { shouldDirty: true, shouldValidate: true };

function InntektTabell(props: Props) {
    const { refusjon, onChange } = props;
    const { id, sistEndret, refusjonsgrunnlag } = refusjon;
    const { inntektsgrunnlag, tilskuddsgrunnlag, bruttolonnOpptjentIPerioden, ferietrekkIPerioden } = refusjonsgrunnlag;

    const { control, formState, setValue, resetField } = useFormContext<InntektFields>();
    const [harOpptjentInntektIPerioden, harIkkeOpptjentInntekterIPerioden] = useWatch({
        control,
        name: ['harOpptjentInntektIPerioden', 'harIkkeOpptjentInntekterIPerioden'],
    });
    const [inntekter, setInntekter] = useState<Inntektslinje[]>(inntektsgrunnlag?.inntekterForPerioden ?? []);

    useEffect(() => {
        const erGyldig = inntektSchema.safeParse({
            harOpptjentInntektIPerioden,
            harIkkeOpptjentInntekterIPerioden,
        }).success;

        onChange({
            erGyldig,
            belop: bruttolonnOpptjentIPerioden + ferietrekkIPerioden,
            harOpptjentInntektIPerioden,
            harIkkeOpptjentInntekterIPerioden,
        });
    }, [
        bruttolonnOpptjentIPerioden,
        ferietrekkIPerioden,
        harOpptjentInntektIPerioden,
        harIkkeOpptjentInntekterIPerioden,
        onChange,
    ]);

    useEffect(() => {
        const nyeInntekter = inntektsgrunnlag?.inntekterForPerioden ?? [];
        if (!erInntektLike(nyeInntekter, inntekter)) {
            setInntekter(nyeInntekter);
            setValue('harOpptjentInntektIPerioden', harOpptjentInntekterIPerioden(nyeInntekter), settVerdiOpts);
            resetField('harIkkeOpptjentInntekterIPerioden');
        }
    }, [inntekter, inntektsgrunnlag?.inntekterForPerioden, setValue, resetField]);

    const onInntektslinjeChange = async (endring: Inntektsendring) => {
        const nyeInntekter = oppdaterInntektslinjeOpptjentIPeriode(inntekter, endring);

        setValue('harOpptjentInntektIPerioden', harOpptjentInntekterIPerioden(nyeInntekter), settVerdiOpts);
        setValue('harIkkeOpptjentInntekterIPerioden', endring.type === 'INGEN-INNTEKTER', settVerdiOpts);
        setInntekter(nyeInntekter);

        await setInntektslinjerOpptjentIPeriode(id, nyeInntekter, sistEndret);
    };

    const feilmelding = formState.errors.harIkkeOpptjentInntekterIPerioden?.message;

    return (
        <VStack gap="space-24">
            <Heading level="2" size="small">
                Inntekter i perioden
            </Heading>
            <VStack gap="space-12">
                <VStack gap="space-2">
                    <Label size="small">Inntektsopplysninger hentes automatisk fra a-meldingen</Label>
                    <BodyShort size="small">
                        Huk av de inntektene som er opptjent i {månedsNavn(tilskuddsgrunnlag.tilskuddFom)}, og som er
                        tilknyttet denne refusjonen for {tiltakstypeTekst[tilskuddsgrunnlag.tiltakstype]}.
                    </BodyShort>
                </VStack>
                <Box overflowX="auto">
                    <Table size="medium" aria-describedby={feilmelding ? 'inntekter-feilmelding' : undefined}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Beskrivelse</Table.HeaderCell>
                                <Table.HeaderCell>Opptjeningsperiode</Table.HeaderCell>
                                <Table.HeaderCell align="right">Beløp</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {inntekter.map((inntekt, i) => (
                                <Fragment key={inntekt.id}>
                                    {(i === 0 || inntekter[i - 1].måned !== inntekt.måned) && (
                                        <Table.Row shadeOnHover={false}>
                                            <Table.DataCell colSpan={3}>
                                                <b>
                                                    {storForbokstav(månedsNavn(inntekt.måned))} ({inntekt.måned})
                                                </b>
                                            </Table.DataCell>
                                        </Table.Row>
                                    )}
                                    <Table.Row
                                        selected={!!inntekt.erOpptjentIPeriode}
                                        onRowClick={() =>
                                            onInntektslinjeChange({
                                                type: 'INNTEKT',
                                                id: inntekt.id,
                                                erOpptjentIPeriode: !inntekt.erOpptjentIPeriode,
                                            })
                                        }
                                    >
                                        <Table.DataCell>
                                            <HStack align="center" gap="space-8" wrap={false}>
                                                <Checkbox
                                                    checked={!!inntekt.erOpptjentIPeriode}
                                                    hideLabel
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        onInntektslinjeChange({
                                                            type: 'INNTEKT',
                                                            id: inntekt.id,
                                                            erOpptjentIPeriode: !inntekt.erOpptjentIPeriode,
                                                        });
                                                    }}
                                                >
                                                    Velg "{inntektBeskrivelse(inntekt.beskrivelse)}"
                                                </Checkbox>
                                                <span>{inntektBeskrivelse(inntekt.beskrivelse)}</span>
                                            </HStack>
                                        </Table.DataCell>
                                        <Table.DataCell>
                                            {inntekt.opptjeningsperiodeFom && inntekt.opptjeningsperiodeTom
                                                ? formaterPeriode(
                                                      inntekt.opptjeningsperiodeFom,
                                                      inntekt.opptjeningsperiodeTom,
                                                      NORSK_DATO_MÅNED_FORMAT
                                                  )
                                                : 'Ikke rapportert'}
                                        </Table.DataCell>
                                        <Table.DataCell align="right">{formatterPenger(inntekt.beløp)}</Table.DataCell>
                                    </Table.Row>
                                </Fragment>
                            ))}
                            <Table.Row>
                                <Table.DataCell colSpan={2}>
                                    <strong>Sum bruttolønn</strong>
                                </Table.DataCell>
                                <Table.DataCell align="right">
                                    <strong>{formatterPenger(bruttolonnOpptjentIPerioden)}</strong>
                                </Table.DataCell>
                            </Table.Row>
                            {ferietrekkIPerioden !== 0 && (
                                <>
                                    <Table.Row>
                                        <Table.DataCell colSpan={2}>Ferietrekk</Table.DataCell>
                                        <Table.DataCell align="right">
                                            {formatterPenger(ferietrekkIPerioden)}
                                        </Table.DataCell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.DataCell colSpan={2}>
                                            <strong>Sum</strong>
                                        </Table.DataCell>
                                        <Table.DataCell align="right">
                                            <strong>
                                                {formatterPenger(bruttolonnOpptjentIPerioden + ferietrekkIPerioden)}
                                            </strong>
                                        </Table.DataCell>
                                    </Table.Row>
                                </>
                            )}
                            <Table.Row
                                selected={harIkkeOpptjentInntekterIPerioden ?? false}
                                onRowClick={() => onInntektslinjeChange({ type: 'INGEN-INNTEKTER' })}
                            >
                                <Table.DataCell colSpan={3}>
                                    <HStack align="center" gap="space-8" wrap={false}>
                                        <Checkbox
                                            checked={harIkkeOpptjentInntekterIPerioden ?? false}
                                            hideLabel
                                            onChange={() => onInntektslinjeChange({ type: 'INGEN-INNTEKTER' })}
                                        >
                                            Velg "Det er ikke opptjent inntekter i perioden"
                                        </Checkbox>
                                        <span>Det er ikke opptjent inntekter i perioden</span>
                                    </HStack>
                                </Table.DataCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Box>
                <VStack gap="space-24">
                    {inntektsgrunnlag?.innhentetTidspunkt && (
                        <BodyShort align="end" size="small" textColor="subtle">
                            Sist hentet: {formaterDato(inntektsgrunnlag.innhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)}
                        </BodyShort>
                    )}
                    {feilmelding && (
                        <InlineMessage id="inntekter-feilmelding" status="error" role="alert">
                            {feilmelding}
                        </InlineMessage>
                    )}
                    <InntektAccordion refusjon={refusjon} />
                </VStack>
            </VStack>
        </VStack>
    );
}

export default InntektTabell;
