import { Alert, BodyShort, Button, List, VStack } from '@navikt/ds-react';
import GodkjenningsPanel from '@/komponenter/GodkjenningsPanel';
import React, { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Vilkaar from './Vilkaar';
import { z } from 'zod';

const BEKREFTELSE_FEILMELDING = 'Du må bekrefte at opplysningene er riktige før du kan sende inn skjemaet.';

const STANDARD_PUNKTER = ['Innholdet i avtalen er korrekt', 'Kravene til arbeidsgiver er lest og forstått'];

interface Props {
    punkter?: string[];
    vilkaar?: ReactNode;
    knappetekst?: string;
    innsendingDeaktivert?: boolean;
}

export const bekreftelseSchema = z.object({
    bekreftetOpplysninger: z
        .boolean({ required_error: BEKREFTELSE_FEILMELDING })
        .refine((bekreftet) => bekreftet, { message: BEKREFTELSE_FEILMELDING }),
});

export type BekreftelseFields = z.infer<typeof bekreftelseSchema>;

export const bekreftelseDefaultValues = (): Partial<BekreftelseFields> => ({
    bekreftetOpplysninger: false,
});

function Bekreftelse({
    punkter = STANDARD_PUNKTER,
    vilkaar = <Vilkaar />,
    knappetekst = 'Fullfør',
    innsendingDeaktivert = false,
}: Props = {}) {
    const { control, formState } = useFormContext<BekreftelseFields>();

    const feilmeldinger = Object.entries(formState.errors)
        .map(([felt, error]) => ({ felt, melding: error?.message }))
        .filter((feil) => !!feil.melding);

    const visFeiloppsummering = formState.submitCount > 0 && feilmeldinger.length > 0;

    return (
        <>
            <VStack gap="space-12">
                {vilkaar}
                <Controller
                    name="bekreftetOpplysninger"
                    control={control}
                    render={({ field, fieldState }) => (
                        <GodkjenningsPanel
                            checkboxLabel="Ja, jeg bekrefter."
                            error={fieldState.error?.message}
                            isChecked={field.value ?? false}
                            setChecked={field.onChange}
                        >
                            <List>
                                {punkter.map((punkt) => (
                                    <List.Item key={punkt}>{punkt}</List.Item>
                                ))}
                            </List>
                        </GodkjenningsPanel>
                    )}
                />
            </VStack>
            {visFeiloppsummering && (
                <Alert variant="error">
                    <BodyShort size="small" spacing>
                        Du må rette opp følgende før du kan sende inn refusjonen:
                    </BodyShort>
                    <List size="small">
                        {feilmeldinger.map(({ felt, melding }) => (
                            <List.Item key={felt}>{melding}</List.Item>
                        ))}
                    </List>
                </Alert>
            )}
            <div>
                <Button type="submit" variant="primary" disabled={innsendingDeaktivert}>
                    {knappetekst}
                </Button>
            </div>
        </>
    );
}

export default Bekreftelse;
