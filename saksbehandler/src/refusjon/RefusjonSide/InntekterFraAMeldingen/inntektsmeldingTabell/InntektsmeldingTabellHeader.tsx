import { FunctionComponent } from 'react';
import { Refusjonsgrunnlag } from '~/types/refusjon';
import { månedsNavn } from '~/utils';


type Props = {
    refusjonsgrunnlag: Refusjonsgrunnlag;
};

const InntektsmeldingTabellHeader: FunctionComponent<Props> = (props) => {
    const månedNavn = månedsNavn(props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom);

    return (
        <thead>
            <tr>
                <th>Beskriv&shy;else</th>
                <th>År/mnd</th>
                <th>Opptjenings&shy;periode</th>
                <th>Opptjent i {månedNavn}?</th>
                <th>Beløp</th>
            </tr>
        </thead>
    );
};
export default InntektsmeldingTabellHeader;
