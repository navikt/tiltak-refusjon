import { Refusjon, RefusjonStatus } from '~/types';
import { Accordion, Alert, BodyShort, Button, VStack } from '@navikt/ds-react';
import { ArrowsCirclepathIcon } from '@navikt/aksel-icons';
import { formaterDato, månedsNavnPlusMåned } from '~/utils';
import React from 'react';
import { hentInntekterLengerFrem as merkForHentingAvInntekterFrem } from '@/services/rest-service';

interface Props {
    refusjon: Refusjon;
}

function InntektAccordion(props: Props) {
    const {
        refusjon: { id, sistEndret, status, hentInntekterLengerFrem, unntakOmInntekterFremitid, refusjonsgrunnlag },
    } = props;
    const { tilskuddsgrunnlag } = refusjonsgrunnlag;

    return (
        <Accordion data-color="accent" indent size="small">
            <Accordion.Item>
                <Accordion.Header>Jeg finner ikke inntektene jeg leter etter</Accordion.Header>
                <Accordion.Content>
                    <VStack gap="space-12">
                        <BodyShort size="small">
                            Det kan hende inntektene blir rapportert senere enn tilskuddsperioden gjelder.
                        </BodyShort>
                        {status === RefusjonStatus.KLAR_FOR_INNSENDING &&
                            !hentInntekterLengerFrem &&
                            unntakOmInntekterFremitid === 0 && (
                                <div>
                                    <Button
                                        size="small"
                                        variant="secondary"
                                        icon={<ArrowsCirclepathIcon aria-hidden />}
                                        onClick={() => merkForHentingAvInntekterFrem(id, true, sistEndret)}
                                    >
                                        Hent inntekter rapportert i{' '}
                                        {månedsNavnPlusMåned(tilskuddsgrunnlag.tilskuddFom, 1)}
                                    </Button>
                                </div>
                            )}
                        {hentInntekterLengerFrem && (
                            <Alert variant="info" size="small">
                                Inntekter for {månedsNavnPlusMåned(tilskuddsgrunnlag.tilskuddFom, 1)} ble hentet{' '}
                                {formaterDato(hentInntekterLengerFrem)}.
                            </Alert>
                        )}
                    </VStack>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Opplysningene stemmer ikke</Accordion.Header>
                <Accordion.Content>
                    <BodyShort size="small">
                        Hvis inntektsopplysningene ikke stemmer, må de korrigeres i lønnssystemet og rapporteres på nytt
                        i a-meldingen.
                    </BodyShort>
                    <BodyShort size="small">
                        Hvis du har rapportert inntekter for sent, kan du ta kontakt med Nav-veileder for å åpne for
                        henting av inntekter som er rapportert inn for senere måneder.
                    </BodyShort>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
}

export default InntektAccordion;
