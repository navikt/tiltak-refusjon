import React, { ChangeEvent, FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';

import { sumInntekterOpptjentIPeriode } from '../../utils/inntekterUtiles';
import { settTidligereRefunderbarBeløp } from '../../services/rest-service';
import { useParams } from 'react-router';

import VerticalSpacer from '~/VerticalSpacer';

import { Alert, Radio, RadioGroup, TextField, Heading, Label, BodyShort, debounce } from '@navikt/ds-react';
import BEMHelper from '~/utils/bem';
import { tiltakstypeTekst } from '~/types/messages';
import { formatterDato } from '~/utils';
import { Refusjon } from '~/types/refusjon';

interface Properties {
    refusjon: Refusjon;
}

const TidligereRefunderbarBeløp: FunctionComponent<Properties> = ({ refusjon }: PropsWithChildren<Properties>) => {
    const { refusjonId } = useParams();
    const { inntektsgrunnlag, inntekterKunFraTiltaket, fratrekkRefunderbarBeløp, beregning, refunderbarBeløp } =
        refusjon.refusjonsgrunnlag;
    const [fratrekk, setFratrekk] = useState<boolean | undefined>(fratrekkRefunderbarBeløp);
    const [belop, setBelop] = useState<string>(beregning?.tidligereRefundertBeløp?.toString() ?? '');

    useEffect(() => {
        setFratrekk(fratrekkRefunderbarBeløp);
    }, [fratrekkRefunderbarBeløp]);
    if (
        inntektsgrunnlag === undefined ||
        !refusjon.harTattStillingTilAlleInntektslinjer ||
        inntekterKunFraTiltaket === null
    ) {
        return null;
    }

    const ANTALL_MILLISEKUNDER = 100;
    const delaySettTidligereRefunderbarBeløp = debounce(settTidligereRefunderbarBeløp, ANTALL_MILLISEKUNDER);

    const sumInntekterOpptjent: number = sumInntekterOpptjentIPeriode(inntektsgrunnlag);
    const erFratrekStørre = fratrekkRefunderbarBeløp && parseInt(belop, 10) - sumInntekterOpptjent > 0;

    const cls = BEMHelper('refusjonside');
    return (
        <div className={cls.element('fratrekk-sykepenger')}>
            <Heading level="3" size="small" className={cls.element('fratrekk-sykepenger-tittel')}>
                Fravær i perioden
            </Heading>
            <div className={cls.element('fratrekk-sykepenger-txt')}>
                <BodyShort size="small">
                    Har dere fått utbetalt refusjon av lønn på grunn av fravær for deltaker, for eksempel refusjon av
                    sykepenger, så skal dette beløpet trekkes fra refusjon om{' '}
                    {tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}. Beløpet som skal
                    trekkes fra er det beløpet dere har fått i refusjon av NAV.
                </BodyShort>
                <VerticalSpacer rem={0.5} />
                <BodyShort size="small">
                    Har dere søkt om refusjon for fravær og venter på rett beløp så må dere vente med å fylle ut
                    refusjon for {tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}. Fristen
                    vil automatisk utsettes mens dere venter på rett beløp.
                </BodyShort>
            </div>
            <Alert variant="info" size="small">
                Refusjon av utbetalt lønn kan være aktuelt dersom dere har søkt om, eller fått utbetalt, refusjon for
                sykepenger / foreldrepenger / svangerskapspenger / opplæringspenger / pleiepenger, eller hvis detalker
                har vært fraværende på grunn av egen eller barns sykdom i denne perioden.
            </Alert>
            <VerticalSpacer rem={1.75} />
            <Label>Har deltaker hatt fravær med lønn som blir refundert av NAV i denne perioden?</Label>

            <RadioGroup legend="" value={fratrekk} className={cls.element('fratrekk-sykepenger-radiogroup')}>
                <Radio
                    name=""
                    value={true}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFratrekk(event.currentTarget.checked);
                        delaySettTidligereRefunderbarBeløp(refusjonId!, true, refusjon.sistEndret, refunderbarBeløp);
                    }}
                >
                    Ja
                </Radio>
                <Radio
                    name=""
                    value={false}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFratrekk(!event.currentTarget.checked);
                        setBelop('');
                        delaySettTidligereRefunderbarBeløp(refusjonId!, false, refusjon.sistEndret, undefined);
                    }}
                >
                    Nei
                </Radio>
            </RadioGroup>
            {fratrekk === true && (
                <BodyShort size="small" className={cls.element('ny-frist')}>
                    Ny frist for å søke refusjon: <strong>{formatterDato(refusjon.fristForGodkjenning)}</strong>
                </BodyShort>
            )}

            {fratrekk === true && (
                <>
                    <TextField
                        className={cls.element('beløp-grunnet-fravær')}
                        size="small"
                        label={`Refusjonsbeløpet på grunn av fravær`}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const verdi: string = event.currentTarget.value;
                            if (verdi.match(/^\d*$/)) {
                                setBelop(verdi);
                            }
                            if (!verdi) {
                                setBelop('');
                            }
                        }}
                        onBlur={() =>
                            delaySettTidligereRefunderbarBeløp(
                                refusjonId!,
                                true,
                                refusjon.sistEndret,
                                parseInt(belop, 10)
                            )
                        }
                        value={belop}
                    />
                </>
            )}
            <VerticalSpacer rem={1.75} />
            {erFratrekStørre && (
                <Alert variant="warning" size="small">
                    Refusjon av utbetalt lønn er større enn bruttolønn.
                </Alert>
            )}
        </div>
    );
};
export default TidligereRefunderbarBeløp;
