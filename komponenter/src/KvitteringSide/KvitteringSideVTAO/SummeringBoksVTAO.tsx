import Pengesedler from '@/asset/image/pengesedler.svg?react';
import { Label, BodyShort } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { formatterPeriode } from '../../utils/datoUtils';
import { Refusjonsgrunnlag } from '~/types/refusjon';
import Boks from '~/Boks';
import VerticalSpacer from '~/VerticalSpacer';
import { formatterPenger } from '~/utils/PengeUtils';

const SummeringBoksVTAO: FunctionComponent<{ refusjonsgrunnlag: Refusjonsgrunnlag }> = ({ refusjonsgrunnlag }) => {
    const { bedriftKontonummer, tilskuddsgrunnlag } = refusjonsgrunnlag;

    return (
        <Boks variant="blå">
            <div style={{ margin: '0.5rem 1rem 0 0' }}>
                <Pengesedler />
            </div>
            <div>
                <Label>Dere får utbetalt</Label>
                <VerticalSpacer rem={0.5} />
                <BodyShort size="small">
                    <b>{formatterPenger(tilskuddsgrunnlag.tilskuddsbeløp || 0)}</b> for perioden{' '}
                    {formatterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)} til kontonummer{' '}
                    {bedriftKontonummer}
                </BodyShort>
                <VerticalSpacer rem={1} />
                <BodyShort size="small">
                    Tilskudd for varig tilrettelagt arbeid i ordinær virksomhet blir automatisk utbetalt på konto
                    etterskuddsvis, hver måned. Det tar 2-3 dager før pengene står på konto.
                </BodyShort>
            </div>
        </Boks>
    );
};

export default SummeringBoksVTAO;
