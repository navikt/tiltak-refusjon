import { Heading, Tag } from '@navikt/ds-react';
import { ReactElement } from 'react';
import Boks from '~/Boks';
import InformasjonFraAvtalen from '@/refusjon/RefusjonSide/informasjonAvtalen/InformasjonFraAvtalen';
import LagreSomPdfKnapp from '~/KvitteringSide/LagreSomPdfKnapp';
import Statusmelding from '~/KvitteringSide/Statusmelding';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, statusTekst, tiltakstypeTekst, RefusjonStatus, Refusjon } from '~/types';
import { formatterDato, NORSK_DATO_FORMAT, NORSK_DATO_OG_TID_FORMAT } from '~/utils';
import { storForbokstav } from '~/utils/stringUtils';
import UtregningMentor from '~/KvitteringSide/KvitteringSideMentor/UtregningMentor';
import SummeringBoksMentor from '~/KvitteringSide/KvitteringSideMentor/SummeringBoksMentor';

export const etikettForRefusjonStatus = (refusjon: Refusjon): ReactElement => {
    if (refusjon.status === RefusjonStatus.UTBETALING_FEILET) {
        return <Tag variant="error">{storForbokstav(statusTekst[refusjon.status])} </Tag>;
    } else if (refusjon.status === RefusjonStatus.UTBETALT) {
        return (
            <Tag variant="info">
                {storForbokstav(statusTekst[refusjon.status])}{' '}
                {refusjon.utbetaltTidspunkt && formatterDato(refusjon.utbetaltTidspunkt, NORSK_DATO_FORMAT)}
            </Tag>
        );
    } else {
        return (
            <Tag variant="info">
                {storForbokstav(statusTekst[refusjon.status])}{' '}
                {refusjon.godkjentAvArbeidsgiver &&
                    formatterDato(refusjon.godkjentAvArbeidsgiver, NORSK_DATO_OG_TID_FORMAT)}
            </Tag>
        );
    }
};

interface Props {
    aktsomhet?: Aktsomhet;
    refusjon: Refusjon;
}

const KvitteringSideMentorArbeidsgiver = (props: Props) => {
    const { refusjon, aktsomhet } = props;

    return (
        <Boks variant="hvit">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading size="large" role="heading">
                    Refusjon for {tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}
                </Heading>
                {etikettForRefusjonStatus(refusjon)}
            </div>
            <VerticalSpacer rem={1} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5rem' }}>
                <Statusmelding status={refusjon.status} sendtTidspunkt={refusjon.godkjentAvArbeidsgiver} vtao={true} />
                <LagreSomPdfKnapp avtaleId={refusjon.id} />
            </div>

            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen refusjon={refusjon} aktsomhet={aktsomhet} />
            <VerticalSpacer rem={2} />
            <UtregningMentor
                tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                beregning={refusjon.refusjonsgrunnlag.beregning}
            />
            <VerticalSpacer rem={2} />
            <SummeringBoksMentor refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
        </Boks>
    );
};

export default KvitteringSideMentorArbeidsgiver;
