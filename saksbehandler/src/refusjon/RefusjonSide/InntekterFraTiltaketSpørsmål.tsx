import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';

import BEMHelper from '~/utils/bem';
import VerticalSpacer from '~/VerticalSpacer';
import { BodyShort, Heading, Label, Radio, RadioGroup, TextField } from '@navikt/ds-react';
import { Refusjonsgrunnlag } from '~/types/refusjon';
import { endreBruttolønn, useHentKorreksjon } from '@/services/rest-service';
import { formatterPenger } from '@/utils/PengeUtils';
import { formatterPeriode, månedsNavn } from '~/utils';
import { sumInntekterOpptjentIPeriode } from '@/utils/inntekterUtils';
import { tiltakstypeTekst } from '~/types/messages';

import InntekterOpptjentIPeriodeTabell from './InntekterOpptjentIPeriodeTabell';
import styles from './InntekterFraTiltaketSpørsmål.module.less';

const InntekterFraTiltaketSpørsmål: FunctionComponent<{ refusjonsgrunnlag: Refusjonsgrunnlag }> = (props) => {
    const cls = BEMHelper('refusjonside');
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const korreksjon = useHentKorreksjon(korreksjonId);
    const { inntektsgrunnlag, tilskuddsgrunnlag } = korreksjon.refusjonsgrunnlag;
    const refusjonsgrunnlag = props.refusjonsgrunnlag;
    const [inntekterKunFraTiltaket, setInntekterKunFraTiltaket] = useState(refusjonsgrunnlag.inntekterKunFraTiltaket);
    const [endretBruttoLønn, setEndretBruttoLønn] = useState(refusjonsgrunnlag.endretBruttoLønn);

    const refusjonNummer = `${tilskuddsgrunnlag.avtaleNr}-${tilskuddsgrunnlag.løpenummer}`;
    const periode = formatterPeriode(
        korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
        korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom,
        'DD.MM'
    );

    if (!refusjonsgrunnlag.inntektsgrunnlag) {
        return null;
    }

    const svarPåSpørsmål = (checked: boolean) => {
        setInntekterKunFraTiltaket(checked);
        if (checked) {
            setEndretBruttoLønn(undefined);
            endreBruttolønn(korreksjonId!, checked, undefined);
        }
    };

    if (
        inntektsgrunnlag === undefined ||
        !korreksjon.harTattStillingTilAlleInntektslinjer ||
        !inntektsgrunnlag?.inntekter?.find((inntekt) => inntekt.erMedIInntektsgrunnlag) ||
        inntektsgrunnlag?.inntekter.filter((inntekt) => inntekt.erOpptjentIPeriode).length < 1
    ) {
        return null;
    }

    const sumInntekterOpptjent: number = sumInntekterOpptjentIPeriode(inntektsgrunnlag);

    const månedNavn = månedsNavn(props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom);

    return (
        <div className={styles.gronnBoks}>
            <Heading size="small">
                Inntekter som skal refunderes for{' '}
                {formatterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}
            </Heading>
            <VerticalSpacer rem={1} />
            <BodyShort size="small">
                Dette er inntekter som er opptjent i perioden. Det vil gjøres en utregning under med sum bruttolønn som
                grunnlag.
            </BodyShort>
            <VerticalSpacer rem={1} />
            <InntekterOpptjentIPeriodeTabell
                inntekter={props.refusjonsgrunnlag.inntektsgrunnlag?.inntekter ?? []}
                månedsNavn={månedNavn}
            />
            <VerticalSpacer rem={1} />
            <Label htmlFor={'inntekterKunFraTiltaket'}>
                Er inntektene du har huket av{' '}
                {sumInntekterOpptjent > 0 && <>({formatterPenger(sumInntekterOpptjent)})</>} tilknyttet refusjonssnummer{' '}
                {refusjonNummer} for perioden {periode} for tiltaket{' '}
                {tiltakstypeTekst[korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}?
            </Label>
            <p>
                <i>Du skal svare ja hvis perioden og bruttolønn samsvarer.</i>
            </p>
            <p>
                <i>
                    Du skal svare nei hvis inntekter skal brukes i andre refusjoner tilknyttet andre tilskuddsperioder
                    eller bruttolønn blir høyere.
                </i>
            </p>
            <RadioGroup legend="" className={cls.element('inntekter-kun-fra-tiltaket')} value={inntekterKunFraTiltaket}>
                <Radio
                    name="inntekterKunFraTiltaket"
                    value={true}
                    checked={inntekterKunFraTiltaket === true}
                    onChange={() => svarPåSpørsmål(true)}
                >
                    Ja
                </Radio>
                <Radio
                    name="inntekterKunFraTiltaket"
                    value={false}
                    checked={inntekterKunFraTiltaket === false}
                    onChange={() => svarPåSpørsmål(false)}
                >
                    Nei
                </Radio>
            </RadioGroup>
            {inntekterKunFraTiltaket === false && (
                <>
                    <VerticalSpacer rem={1} />
                    <TextField
                        size="small"
                        label={`Skriv inn bruttolønn utbetalt for ${
                            tiltakstypeTekst[refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]
                        }`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const verdi = event.currentTarget.value;
                            if (verdi.match(/^\d*$/) && parseInt(verdi, 10) <= sumInntekterOpptjent) {
                                setEndretBruttoLønn(Number(verdi));
                            }
                        }}
                        onBlur={() => endreBruttolønn(korreksjonId!, false, endretBruttoLønn)}
                        value={endretBruttoLønn}
                    />
                </>
            )}
        </div>
    );
};

export default InntekterFraTiltaketSpørsmål;
