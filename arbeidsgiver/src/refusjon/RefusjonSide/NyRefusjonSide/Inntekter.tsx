import React from 'react';

import { Accordion, BodyShort, Box, Button, Checkbox, Heading, HStack, Label, Table, VStack } from '@navikt/ds-react';
import sortBy from 'lodash.sortby';

import LagreKnapp from '@/komponenter/LagreKnapp';
import { hentInntekterLengerFrem, setInntektslinjeOpptjentIPeriode } from '@/services/rest-service';
import { valgtBruttoLønn } from '@/utils/inntekterUtiles';

import { Refusjon, tiltakstypeTekst } from '~/types';
import {
    formaterDato,
    formaterPeriode,
    månedsNavn,
    månedsNavnPlusMåned,
    NORSK_DATO_OG_TID_FORMAT,
    NORSK_DATO_MÅNED_FORMAT,
} from '~/utils';
import { formatterPenger } from '~/utils/PengeUtils';

import { inntektBeskrivelse } from '../inntektsmelding/InntekterFraAMeldingen';
import { ArrowsCirclepathIcon } from '@navikt/aksel-icons';

function Inntekter({ refusjon }: { refusjon: Refusjon }) {
    const { inntektsgrunnlag, tilskuddsgrunnlag } = refusjon.refusjonsgrunnlag;
    const måned = månedsNavn(tilskuddsgrunnlag.tilskuddFom);
    const nesteMåned = månedsNavnPlusMåned(tilskuddsgrunnlag.tilskuddFom, 1);
    const inntekter = sortBy(inntektsgrunnlag?.inntekter.filter((inntekt) => inntekt.erMedIInntektsgrunnlag) ?? [], [
        'opptjeningsperiodeFom',
        'opptjeningsperiodeTom',
        'beskrivelse',
        'id',
    ]);

    return (
        <VStack gap="space-24">
            <Heading level="2" size="small">
                Inntekter i perioden
            </Heading>
            <VStack gap="space-12">
                <VStack gap="space-2">
                    <Label size="small">Inntektsopplysninger hentes automatisk fra a-meldingen</Label>
                    <BodyShort size="small">
                        Huk av de inntektene som er opptjent i {måned}, og som er tilknyttet denne refusjonen for{' '}
                        {tiltakstypeTekst[tilskuddsgrunnlag.tiltakstype]}.
                    </BodyShort>
                </VStack>

                <Box overflowX="auto">
                    <Table size="medium">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Beskrivelse</Table.HeaderCell>
                                <Table.HeaderCell>Opptjeningsperiode</Table.HeaderCell>
                                <Table.HeaderCell align="right">Beløp</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {inntekter.map((inntekt) => (
                                <Table.Row key={inntekt.id} selected={!!inntekt.erOpptjentIPeriode}>
                                    <Table.DataCell>
                                        <HStack align="center" gap="space-8" wrap={false}>
                                            <Checkbox
                                                checked={!!inntekt.erOpptjentIPeriode}
                                                hideLabel
                                                onChange={(event) =>
                                                    setInntektslinjeOpptjentIPeriode(
                                                        refusjon.id,
                                                        inntekt.id,
                                                        event.currentTarget.checked,
                                                        refusjon.sistEndret
                                                    )
                                                }
                                            >
                                                Velg {inntektBeskrivelse(inntekt.beskrivelse)}
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
                            ))}
                            <Table.Row>
                                <Table.DataCell colSpan={2}>
                                    <strong>Sum bruttolønn</strong>
                                </Table.DataCell>
                                <Table.DataCell align="right">
                                    <strong>{formatterPenger(valgtBruttoLønn(inntekter))}</strong>
                                </Table.DataCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Box>
                {inntektsgrunnlag?.innhentetTidspunkt && (
                    <BodyShort align="end" size="small">
                        Sist hentet: {formaterDato(inntektsgrunnlag.innhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)}
                    </BodyShort>
                )}

                <Accordion data-color="accent" indent size="small">
                    <Accordion.Item>
                        <Accordion.Header>Jeg finner ikke inntektene jeg leter etter</Accordion.Header>
                        <Accordion.Content>
                            <VStack gap="space-12">
                                <BodyShort size="small">
                                    Det kan hende inntektene blir rapportert senere enn tilskuddsperioden gjelder.
                                </BodyShort>
                                <Button
                                    size="small"
                                    variant="tertiary"
                                    icon={<ArrowsCirclepathIcon aria-hidden />}
                                    onClick={async () => {
                                        await hentInntekterLengerFrem(refusjon.id, true, refusjon.sistEndret);
                                    }}
                                >
                                    Hent inntekter rapportert for {nesteMåned}
                                </Button>
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Opplysningene stemmer ikke</Accordion.Header>
                        <Accordion.Content>
                            <BodyShort size="small">
                                Hvis inntektsopplysningene ikke stemmer, må de korrigeres i lønnssystemet og rapporteres
                                på nytt i a-meldingen.
                            </BodyShort>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </VStack>
        </VStack>
    );
}

export default Inntekter;
