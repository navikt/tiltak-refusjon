import React, { FunctionComponent, PropsWithChildren } from 'react';

import { Tag, BodyShort, Heading } from '@navikt/ds-react';
import { Refusjon } from '~/types/refusjon';
import BEMHelper from '~/utils/bem';
import { storForbokstav } from '~/utils/stringUtils';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '~/utils';
import { statusTekst, tiltakstypeTekst } from '~/types/messages';
import EksternLenke from '~/EksternLenke/EksternLenke';

interface Properties {
    refusjon: Refusjon;
}

const RefusjonIngress: FunctionComponent<Properties> = ({ refusjon }: PropsWithChildren<Properties>) => {
    const cls = BEMHelper('refusjonside');
    return (
        <>
            <div className={cls.element('ingress')}>
                <Heading level="1" size="large" role="heading" aria-level={1}>
                    Beregning av refusjon for{' '}
                    {tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}
                </Heading>
                <Tag variant="info" size="small">
                    {storForbokstav(statusTekst[refusjon.status])}{' '}
                    {refusjon.godkjentAvArbeidsgiver &&
                        formatterDato(refusjon.godkjentAvArbeidsgiver, NORSK_DATO_OG_TID_FORMAT)}
                </Tag>
            </div>
            <BodyShort size="small" className={cls.element('ingress-text')}>
                Vi henter inntektsopplysninger for deltakeren fra a-meldingen automatisk. A-meldingen er en månedlig
                melding fra arbeidsgiver til NAV, SSB og Skatteetaten om ansattes inntekt, arbeidsforhold og
                forskuddstrekk, samt arbeidsgiveravgift og finansskatt for virksomheten. Hvis inntektsopplysningene ikke
                stemmer så må det{' '}
                <EksternLenke href={'https://www.altinn.no/skjemaoversikt/a-ordningen/a-melding2/'}>
                    oppdateres i ditt lønnssystem.
                </EksternLenke>
                Feriepenger, innskudd obligatorisk tjenestepensjon, arbeidsgiveravgiften og lønnstilskuddsprosenten er
                hentet fra avtalen om midlertidig lønnstilskudd.
            </BodyShort>
            <BodyShort size="small" className={cls.element('ingress-text-refusjon')}>
                Siste frist for å sende inn kravet er senest to måneder etter at perioden er over. Hvis fristen ikke
                holdes, trekkes tilskuddet som er innvilget og dere får ikke utbetalt støtte.
            </BodyShort>
        </>
    );
};
export default RefusjonIngress;
