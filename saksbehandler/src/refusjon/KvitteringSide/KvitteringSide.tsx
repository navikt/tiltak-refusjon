import { ReactElement } from 'react';
import { Heading, Tag } from '@navikt/ds-react';

import Boks from '~/Boks';
import HarTattStillingTilAlleInntektsLinjerGammel from '@/refusjon/RefusjonSide/HarTattStillingTilAlleInntektsLinjerGammel';
import HarTattStillingTilAlleInntektsLinjerNy from '@/refusjon/RefusjonSide/HarTattStillingTilAlleInntektsLinjerNy';
import InformasjonFraAvtalen from '@/refusjon/RefusjonSide/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '@/refusjon/RefusjonSide/InntekterFraAMeldingen/InntekterFraAMeldingen';
import InntekterFraAMeldingenGammel from '@/refusjon/RefusjonSide/InntekterFraAmeldingenGammel';
import OpprettKorreksjon from '~/knapp/OpprettKorreksjon';
import SjekkReberegning from '@/refusjon/RefusjonSide/SjekkReberegning';
import SummeringBoks from '@/refusjon/RefusjonSide/SummeringBoks';
import SummeringBoksNullbeløp from '@/refusjon/RefusjonSide/SummeringBoksNullbeløp';
import TidligereRefunderbarBeløpKvittering from '@/refusjon/RefusjonSide/TidligereRefunderbarBeløpKvittering';
import Utregning from '@/refusjon/RefusjonSide/Utregning';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, RefusjonStatus, statusTekst, tiltakstypeTekst, Korreksjonsgrunn, Refusjon } from '~/types';
import { Feature } from '@/featureToggles/features';
import { InnloggetBruker } from '~/types/brukerContextType';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '~/utils';
import { storForbokstav } from '~/utils/stringUtils';
import { useFeatureToggles } from '@/featureToggles/FeatureToggleProvider';

import Statusmelding from './Statusmelding';

const etikettForRefusjonStatus = (refusjon: Refusjon): ReactElement => {
    if (refusjon.status === RefusjonStatus.UTBETALING_FEILET) {
        return <Tag variant="warning">{storForbokstav(statusTekst[refusjon.status])} </Tag>;
    }
    return (
        <Tag variant="info">
            {storForbokstav(statusTekst[refusjon.status])}{' '}
            {refusjon.godkjentAvArbeidsgiver &&
                formatterDato(refusjon.godkjentAvArbeidsgiver, NORSK_DATO_OG_TID_FORMAT)}
        </Tag>
    );
};

interface Props {
    aktsomhet?: Aktsomhet;
    refusjon: Refusjon;
    innloggetBruker: InnloggetBruker;
    opprettKorreksjon?: (
        grunner: Korreksjonsgrunn[],
        unntakOmInntekterFremitid?: number,
        annenKorreksjonsGrunn?: string
    ) => Promise<void>;
}

const KvitteringSide = (props: Props) => {
    const { aktsomhet, refusjon, innloggetBruker, opprettKorreksjon } = props;
    const refusjonsgrunnlag = refusjon.refusjonsgrunnlag;
    const featureToggles = useFeatureToggles();

    return (
        <Boks variant="hvit">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {innloggetBruker.harKorreksjonTilgang &&
                    refusjon.status !== RefusjonStatus.UTBETALING_FEILET &&
                    opprettKorreksjon &&
                    !refusjon.korreksjonId && (
                        <OpprettKorreksjon
                            tiltakType={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype}
                            opprettKorreksjon={opprettKorreksjon}
                        />
                    )}
                {featureToggles[Feature.Reberegning] && <SjekkReberegning />}
            </div>
            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading size="large" role="heading">
                    Refusjon for {tiltakstypeTekst[refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}
                </Heading>
                {etikettForRefusjonStatus(refusjon)}
            </div>
            <VerticalSpacer rem={1} />
            <Statusmelding status={refusjon.status} />
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                aktsomhet={aktsomhet}
                tilskuddsgrunnlag={refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
                fristForGodkjenning={refusjon.fristForGodkjenning}
                forrigeFristForGodkjenning={refusjon.forrigeFristForGodkjenning}
            />
            <VerticalSpacer rem={2} />

            {refusjon.refusjonsgrunnlag?.inntektsgrunnlag?.inntekter.find(
                // Dersom det ikke finnes en eneste inntektslinje som har blitt huket av (ja eller nei), så viser vi gammel versjon av InntekterFraAMeldingen
                (i) => i.erOpptjentIPeriode !== null && i.erOpptjentIPeriode !== undefined
            ) ? (
                <>
                    <InntekterFraAMeldingen
                        inntektsgrunnlag={refusjonsgrunnlag.inntektsgrunnlag}
                        kvitteringVisning={true}
                        refusjonsgrunnlag={refusjonsgrunnlag}
                        hentInntekterLengerFrem={refusjon.hentInntekterLengerFrem}
                        unntakOmInntekterFremitid={refusjon.unntakOmInntekterFremitid}
                    />
                    <VerticalSpacer rem={2} />
                    <HarTattStillingTilAlleInntektsLinjerNy refusjonsgrunnlag={refusjonsgrunnlag} />
                    <VerticalSpacer rem={2} />
                    <TidligereRefunderbarBeløpKvittering refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
                </>
            ) : (
                <>
                    <InntekterFraAMeldingenGammel inntektsgrunnlag={refusjonsgrunnlag.inntektsgrunnlag} />
                    <VerticalSpacer rem={2} />
                    <HarTattStillingTilAlleInntektsLinjerGammel refusjonsgrunnlag={refusjonsgrunnlag} />
                    <VerticalSpacer rem={2} />
                    <TidligereRefunderbarBeløpKvittering refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
                </>
            )}
            <VerticalSpacer rem={2} />
            {refusjon.refusjonsgrunnlag.beregning && (
                <Utregning
                    refusjonsnummer={{
                        avtalenr: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
                        løpenummer: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
                    }}
                    erKorreksjon={false}
                    beregning={refusjonsgrunnlag.beregning}
                    tilskuddsgrunnlag={refusjonsgrunnlag.tilskuddsgrunnlag}
                    forrigeRefusjonMinusBeløp={refusjon.refusjonsgrunnlag.forrigeRefusjonMinusBeløp}
                    inntektsgrunnlag={refusjonsgrunnlag.inntektsgrunnlag}
                />
            )}
            <VerticalSpacer rem={4} />
            {refusjon.status === 'GODKJENT_NULLBELØP' && (
                <SummeringBoksNullbeløp refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
            )}
            {refusjon.status !== 'GODKJENT_NULLBELØP' && (
                <SummeringBoks
                    refusjonsgrunnlag={refusjon.refusjonsgrunnlag}
                    enhet={refusjonsgrunnlag.tilskuddsgrunnlag.enhet}
                />
            )}
        </Boks>
    );
};

export default KvitteringSide;
