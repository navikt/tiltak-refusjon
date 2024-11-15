import { BodyLong, Heading, Tag } from '@navikt/ds-react';
import { FunctionComponent, ReactElement } from 'react';
import Boks from '~/Boks/Boks';
import { statusTekst } from '~/types/messages';
import { Korreksjonsgrunn, Refusjon } from '~/types/refusjon';
import { RefusjonStatus } from '~/types/status';
import { formatterDato, NORSK_DATO_FORMAT, NORSK_DATO_OG_TID_FORMAT } from '~/utils';
import { storForbokstav } from '~/utils/stringUtils';
import VerticalSpacer from '~/VerticalSpacer';
import InformasjonFraAvtalenVTAO from './InformasjonFraAvtaleVTAO';
import TilskuddssatsVTAO from './TilskuddssatsVTAO';
import SummeringBoksVTAO from './SummeringBoksVTAO';
import { InnloggetBruker } from '~/types/brukerContextType';

export const etikettForRefusjonStatus = (refusjon: Refusjon): ReactElement => {
    if (refusjon.status === RefusjonStatus.UTBETALING_FEILET) {
        return <Tag variant="error">{storForbokstav(statusTekst[refusjon.status])} </Tag>;
    } else if (refusjon.status === RefusjonStatus.UTBETALT) {
        return (
            <Tag variant="info">
                {storForbokstav(statusTekst[RefusjonStatus.SENDT_KRAV])}{' '}
                {refusjon.godkjentAvArbeidsgiver && formatterDato(refusjon.godkjentAvArbeidsgiver, NORSK_DATO_FORMAT)}
                {', '}
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
    refusjon: Refusjon;
}

const KvitteringSideVTAO: FunctionComponent<Props> = ({ refusjon }) => (
    <Boks variant="hvit">
        <Tag style={{ float: 'right' }} variant={'info'}>
            Status: For tidlig
        </Tag>
        <VerticalSpacer rem={3} />
        <Heading level="2" size="large">
            Refusjon for Varig tilrettelagt arbeid i ordinær virksomhet (VTA-O)
        </Heading>
        <VerticalSpacer rem={1} />
        <BodyLong>
            Arbeidsgiveren får et tilskudd fra NAV for varig tilrettelagt arbeid. Tilskuddssatsen er 6 808 kroner per
            måned. Satsen settes årlig av departementet og avtale- og refusjonsløsningen vil automatisk oppdateres når
            det kommer nye satser.
        </BodyLong>
        <VerticalSpacer rem={1} />

        <InformasjonFraAvtalenVTAO refusjon={refusjon} />
        <VerticalSpacer rem={2} />
        <TilskuddssatsVTAO refusjon={refusjon} />
        <VerticalSpacer rem={1} />
        <SummeringBoksVTAO
            erForKorreksjon={false}
            refusjonsgrunnlag={refusjon.refusjonsgrunnlag}
            status={refusjon.status}
        />
    </Boks>
);

export default KvitteringSideVTAO;
