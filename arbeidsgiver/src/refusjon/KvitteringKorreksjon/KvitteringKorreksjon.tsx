import { ExpansionCard, Heading, Tag } from '@navikt/ds-react';

import Boks from '~/Boks';
import InformasjonFraAvtalen from '@/refusjon/RefusjonSide/informasjonAvtalen/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '@/refusjon/RefusjonSide/inntektsmelding/InntekterFraAMeldingen';
import InntekterFraTiltaketSvar from '@/refusjon/RefusjonSide/InntekterFraTiltaketSvar';
import KorreksjonInfo from './KorreksjonInfo';
import SummeringBoks from '@/refusjon/RefusjonSide/SummeringBoks';
import Utregning from '@/komponenter/Utregning';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, KorreksjonStatus, korreksjonStatusTekst } from '~/types';
import { Korreksjon, Refusjon } from '~/types/refusjon';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '~/utils';
import { storForbokstav } from '~/utils/stringUtils';

import InntekterFraAMeldingenKorreksjon from './InntekterFraAMeldingenKorreksjon';

interface Props {
    aktsomhet?: Aktsomhet;
    refusjon: Refusjon;
    korreksjon: Korreksjon;
}

const KvitteringKorreksjon = (props: Props) => {
    const { refusjon, korreksjon, aktsomhet } = props;

    return (
        <>
            <Boks variant="hvit">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Heading size="large" role="heading">
                        Kvittering for korrigert refusjon
                    </Heading>
                    <Tag variant="info">
                        {storForbokstav(korreksjonStatusTekst[korreksjon.status])}{' '}
                        {korreksjon.status === KorreksjonStatus.TILLEGSUTBETALING &&
                            formatterDato(korreksjon.godkjentTidspunkt!, NORSK_DATO_OG_TID_FORMAT)}
                    </Tag>
                </div>
                <VerticalSpacer rem={1} />
                <KorreksjonInfo korreksjon={korreksjon} />
                <VerticalSpacer rem={2} />
                <InformasjonFraAvtalen refusjon={refusjon} aktsomhet={aktsomhet} />
                <VerticalSpacer rem={2} />
                <InntekterFraAMeldingenKorreksjon korreksjon={korreksjon} kvitteringVisning={true} />
                <VerticalSpacer rem={2} />
                <InntekterFraTiltaketSvar refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
                <VerticalSpacer rem={2} />
                <Utregning
                    refusjonsnummer={{
                        avtalenr: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
                        løpenummer: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
                    }}
                    erKorreksjon={true}
                    beregning={korreksjon.refusjonsgrunnlag.beregning}
                    tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                    inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag}
                    sumUtbetaltVarig={korreksjon.refusjonsgrunnlag.sumUtbetaltVarig}
                />
                <VerticalSpacer rem={4} />
                <SummeringBoks
                    erForKorreksjon={true}
                    refusjonsgrunnlag={korreksjon.refusjonsgrunnlag}
                    status={refusjon.status}
                />
            </Boks>

            <VerticalSpacer rem={2} />
            <ExpansionCard size="small" aria-label="Small-variant" defaultOpen={true}>
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="small">Klikk for å se refusjonen som er korrigert</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <Boks variant="hvit">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Heading size="large" role="heading">
                                Kvittering for refusjon
                            </Heading>
                            <Tag variant="info">
                                Sendt krav {formatterDato(refusjon.godkjentAvArbeidsgiver!, NORSK_DATO_OG_TID_FORMAT)}
                            </Tag>
                        </div>
                        <VerticalSpacer rem={1} />
                        <VerticalSpacer rem={2} />
                        <InntekterFraAMeldingen refusjon={refusjon} kvitteringVisning={true} />
                        <VerticalSpacer rem={2} />
                        <InntekterFraTiltaketSvar refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
                        <VerticalSpacer rem={2} />
                        <Utregning
                            refusjonsnummer={{
                                avtalenr: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
                                løpenummer: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
                            }}
                            erKorreksjon={false}
                            beregning={refusjon.refusjonsgrunnlag.beregning}
                            tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                            forrigeRefusjonMinusBeløp={refusjon.refusjonsgrunnlag.forrigeRefusjonMinusBeløp}
                            inntektsgrunnlag={refusjon.refusjonsgrunnlag.inntektsgrunnlag}
                        />
                        <VerticalSpacer rem={4} />
                        <SummeringBoks
                            erForKorreksjon={false}
                            refusjonsgrunnlag={refusjon.refusjonsgrunnlag}
                            status={refusjon.status}
                        />
                    </Boks>
                </ExpansionCard.Content>
            </ExpansionCard>
            <VerticalSpacer rem={2} />
        </>
    );
};

export default KvitteringKorreksjon;
