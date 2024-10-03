import { BodyShort, Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import BEMHelper from '../../../utils/bem';
import { formatterDato, månedsNavn, NORSK_DATO_OG_TID_FORMAT } from '../../../utils/datoUtils';
import { Refusjonsgrunnlag } from '../../refusjon';

interface Properties {
    refusjonsgrunnlag: Refusjonsgrunnlag;
    unntakOmInntekterFremitid: number;
}

const InntektsMeldingHeader: FunctionComponent<Properties> = ({
    refusjonsgrunnlag,
    unntakOmInntekterFremitid,
}: Properties) => {
    const cls = BEMHelper('inntektsmelding');
    const månedNavn = månedsNavn(refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom);

    return (
        <div className={cls.element('header')}>
            <Heading size="small" className={cls.element('header-tittel')}>
                Inntekter hentet fra A-meldingen for {månedNavn} måned{' '}
                {refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === 'SOMMERJOBB' ? (
                    <>
                        {unntakOmInntekterFremitid > 0 ? (
                            <>og {unntakOmInntekterFremitid} måneder etter</>
                        ) : (
                            'og 1 måned etter'
                        )}
                    </>
                ) : (
                    <>{unntakOmInntekterFremitid > 0 && <>og {unntakOmInntekterFremitid} måneder etter</>}</>
                )}
                      {refusjonsgrunnlag.inntektsgrunnlag && (
                <BodyShort size="small">
                    Sist hentet:{' '}
                    {formatterDato(refusjonsgrunnlag.inntektsgrunnlag.innhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)}
                </BodyShort>
            )}
            </Heading>
        </div>
    );
};
export default InntektsMeldingHeader;
