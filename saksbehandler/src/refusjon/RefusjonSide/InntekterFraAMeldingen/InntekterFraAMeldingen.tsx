import { Alert, Heading } from '@navikt/ds-react';
import { Fragment, FunctionComponent } from 'react';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { lønnsbeskrivelseTekst } from '../../../messages';
import BEMHelper from '../../../utils/bem';
import { månedsNavn } from '../../../utils/datoUtils';
import { Inntektsgrunnlag, Refusjonsgrunnlag } from '../../refusjon';
import './inntektsMelding.less';
import InntektsmeldingTabellBody from './inntektsmeldingTabell/InntektsmeldingTabellBody';
import InntektsmeldingTabellHeader from './inntektsmeldingTabell/InntektsmeldingTabellHeader';
import InntektsMeldingHeader from './InntektsMeldingHeader';
import KvitteringSide from '@/refusjon/KvitteringSide/KvitteringSide';
import Boks from '@/komponenter/Boks/Boks';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';

export const inntektBeskrivelse = (beskrivelse: string | undefined) => {
    if (beskrivelse === undefined) {
        return '';
    } else if (beskrivelse === '') {
        return 'Inntekt';
    } else {
        return lønnsbeskrivelseTekst[beskrivelse] ?? 'Inntekt: ' + beskrivelse;
    }
};

type Props = {
    inntektsgrunnlag: Inntektsgrunnlag | undefined;
    refusjonsgrunnlag: Refusjonsgrunnlag;
    kvitteringVisning: boolean;
    korreksjonId?: string;
    unntakOmInntekterFremitid: number;
    hentInntekterLengerFrem?: string;
};

const InntekterFraAMeldingen: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('inntektsmelding');
    const antallInntekterSomErMedIGrunnlag = props.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.erMedIInntektsgrunnlag
    ).length;

    const ingenInntekter = !props.inntektsgrunnlag || props.inntektsgrunnlag?.inntekter.length === 0;

    const harBruttolønn = props.inntektsgrunnlag ? props.inntektsgrunnlag?.bruttoLønn > 0 : false;

    const ingenRefunderbareInntekter: boolean =
        !!props.inntektsgrunnlag &&
        props.inntektsgrunnlag.inntekter.length > 0 &&
        antallInntekterSomErMedIGrunnlag === 0;

    const månedNavn = månedsNavn(props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom);

    const inntektGrupperObjekt = groupBy(props.inntektsgrunnlag?.inntekter, (inntekt) => inntekt.måned);
    const inntektGrupperListe = Object.entries(inntektGrupperObjekt);
    const inntektGrupperListeSortert = sortBy(inntektGrupperListe, [(i) => i[0]]);

    return (
        <Boks variant="grå">
            <InntektsMeldingHeader
                refusjonsgrunnlag={props.refusjonsgrunnlag}
                unntakOmInntekterFremitid={props.unntakOmInntekterFremitid}
            />
            {harBruttolønn && (
                <i>
                    Her hentes inntekter i form av fastlønn, timelønn, faste tillegg, uregelmessige tillegg knyttet til
                    arbeidet tid og inntekt fra veldedige eller allmennyttige organisasjoner som er rapportert inn i
                    A-meldingen for måneden refusjonen gjelder for.
                </i>
            )}
            {!KvitteringSide &&
                props.inntektsgrunnlag?.inntekter.find((inntekt) => inntekt.erMedIInntektsgrunnlag) &&
                props.inntektsgrunnlag?.inntekter.filter((i) => i.erMedIInntektsgrunnlag).length > 1 && (
                    <>
                        <VerticalSpacer rem={1} />
                        <Alert variant="info" size="small">
                            <div>
                                Vi har funnet flere innrapporterte inntekter. Huk kun av på Ja for inntekter som er
                                opptjent i <strong>{månedNavn}</strong>. <br />
                                Huk av Nei for inntekter som ikke er opptjent i {månedNavn}.
                            </div>
                        </Alert>
                    </>
                )}

            {props.inntektsgrunnlag?.inntekter.find((inntekt) => inntekt.erMedIInntektsgrunnlag) && (
                <>
                    <VerticalSpacer rem={1} />
                    {inntektGrupperListeSortert.map(([aarManed, inntektslinjer]) => (
                        <Fragment key={aarManed}>
                            <Heading level="4" size="small" style={{ display: 'flex', justifyContent: 'center' }}>
                                Inntekt rapportert for {månedsNavn(aarManed)} ({aarManed})
                            </Heading>
                            <div style={{ borderTop: '1px solid #06893b' }}>
                                <table className={cls.element('inntektstabell')}>
                                    <InntektsmeldingTabellHeader refusjonsgrunnlag={props.refusjonsgrunnlag} />
                                    <InntektsmeldingTabellBody
                                        inntektslinjer={inntektslinjer}
                                        kvitteringVisning={props.kvitteringVisning}
                                        korreksjonId={props.korreksjonId}
                                    />
                                </table>
                            </div>
                            <VerticalSpacer rem={1} />
                        </Fragment>
                    ))}
                </>
            )}
            {ingenInntekter && (
                <>
                    <VerticalSpacer rem={1} />
                    <Alert variant="warning" size="small">
                        Vi kan ikke finne inntekter fra a-meldingen for denne perioden. Når a-meldingen er oppdatert vil
                        inntektsopplysningene vises her automatisk.
                    </Alert>
                    <VerticalSpacer rem={1} />
                </>
            )}
            {ingenRefunderbareInntekter && (
                <>
                    <VerticalSpacer rem={1} />
                    <Alert variant="warning" size="small">
                        Vi kan ikke finne noen lønnsinntekter for denne perioden. Når a-meldingen er oppdatert vil
                        inntektsopplysningene vises her automatisk.
                    </Alert>
                    <VerticalSpacer rem={1} />
                </>
            )}
        </Boks>
    );
};

export default InntekterFraAMeldingen;
