import { formatterPenger } from '@/utils/PengeUtils';
import { Alert, BodyShort, Heading, Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Korreksjon } from '~/types/refusjon';
import { storForbokstav } from '~/utils/stringUtils';
import { korreksjonStatusTekst } from '~/types/messages';
import Boks from '~/Boks';
import VerticalSpacer from '~/VerticalSpacer';
import KorreksjonUtregningVTAO from '@/KorreksjonSideVTAO/KorreksjonUtregningVTAO';
import KorreksjonSummeringBoksVTAO from './KorreksjonSummeringBoksVTAO';
import InformasjonFraAvtalen from '@/refusjon/RefusjonSide/InformasjonFraAvtalen';

type Props = {
    korreksjon: Korreksjon;
};

const KorreksjonKvitteringSide: FunctionComponent<Props> = ({ korreksjon }) => {
    return (
        <Boks variant="hvit">
            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading size="large" role="heading">
                    Korreksjon av refusjon
                </Heading>
                <Tag variant="info">{storForbokstav(korreksjonStatusTekst[korreksjon.status])}</Tag>
            </div>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                refusjonId={korreksjon.korrigererRefusjonId}
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={korreksjon.refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={korreksjon.refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={korreksjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
            />
            <VerticalSpacer rem={2} />
            <KorreksjonUtregningVTAO tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag} />
            <VerticalSpacer rem={2} />
            {(korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddsbeløp || 0) > 0 && (
                <Alert variant="warning">
                    <BodyShort>
                        <b>Beslutter NAV:</b> Du må vurdere tilbakekreving i samsvar med gjeldene rutine på{' '}
                        <b>
                            {formatterPenger(
                                Math.abs(korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddsbeløp || 0)
                            )}
                        </b>
                    </BodyShort>
                </Alert>
            )}
            <VerticalSpacer rem={2} />
            <KorreksjonSummeringBoksVTAO tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag} />
        </Boks>
    );
};

export default KorreksjonKvitteringSide;
