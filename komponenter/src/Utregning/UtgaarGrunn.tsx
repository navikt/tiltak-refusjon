import { BodyShort, ReadMore } from '@navikt/ds-react';
import EksternLenke from '~/EksternLenke/EksternLenke';
import { UtgårÅrsak } from '~/types/utregning';

type Props = {
    utgårÅrsak: UtgårÅrsak;
};

const UtgårÅrsakBeskrivelse = (props: Props) => {
    const { utgårÅrsak } = props;
    return (
        <ReadMore size="small" header="Hva betyr dette?" defaultOpen={true}>
            {utgårÅrsak === UtgårÅrsak.OVER_FEM_GRUNNBELOP && (
                <>
                    <BodyShort size="small">
                        Avtalen har nå oversteget fem ganger grunnbeløpet per år. Refusjoner for resten av året vil
                        settes til 0 kr, men dere må fortsatt sende inn refusjoner hver måned.
                    </BodyShort>
                    <BodyShort size="small">
                        <EksternLenke href="https://lovdata.no/forskrift/2015-12-11-1598/§10-7">
                            Forskrift om arbeidsmarkedstiltak (tiltaksforskriften) - Kapittel 10. Varig lønnstilskudd
                        </EksternLenke>
                    </BodyShort>
                </>
            )}
            {utgårÅrsak === UtgårÅrsak.OVER_AVTALT_TILSKUDD && (
                <BodyShort size="small">
                    Beregnet beløp er høyere enn refusjonsbeløpet. Lønn i denne refusjonsperioden kan ikke endres og
                    dere vil få utbetalt maks av avtalt beløp.
                </BodyShort>
            )}
        </ReadMore>
    );
};

export default UtgårÅrsakBeskrivelse;
