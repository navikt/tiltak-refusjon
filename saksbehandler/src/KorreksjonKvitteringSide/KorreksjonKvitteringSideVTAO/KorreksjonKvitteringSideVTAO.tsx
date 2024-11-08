import { formatterPenger } from '@/utils/PengeUtils';
import { Alert, BodyShort, Heading, Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import InformasjonFraAvtalen from '../../refusjon/RefusjonSide/InformasjonFraAvtalen';
import KorreksjonSummeringBoksVTAO from './KorreksjonSummeringsBoksVTAO';
import { Korreksjon } from '~/types/refusjon';
import { storForbokstav } from '~/utils/stringUtils';
import { korreksjonStatusTekst } from '~/types/messages';
import Boks from '~/Boks';
import KorreksjonUtregningVTAO from '@/refusjon/RefusjonSide/KorreksjonUtregningVTAO';

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
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={korreksjon.refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={korreksjon.refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={korreksjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
            />
            <VerticalSpacer rem={2} />
            <KorreksjonUtregningVTAO
                refusjonsnummer={{
                    avtalenr: korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
                    løpenummer: korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
                }}
                erKorreksjon={true}
                beregning={korreksjon.refusjonsgrunnlag.beregning}
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag}
            />
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
