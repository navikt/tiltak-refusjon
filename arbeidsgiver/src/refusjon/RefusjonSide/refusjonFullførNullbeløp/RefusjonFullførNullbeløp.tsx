import { FunctionComponent, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { godkjennRefusjonMedNullbeløp, useHentRefusjon } from '../../../services/rest-service';

import LagreKnapp from '../../../komponenter/LagreKnapp';
import RefusjonFullførNullbeløpModal from './RefusjonFullførNullbeløpModal';
import './refusjonFullførNullbeløp.less';
import BEMHelper from '~/utils/bem';

const RefusjonFullførNullbeløp: FunctionComponent = () => {
    const [visRefusjonFullførNullbeløpModal, setVisRefusjonFullførNullbeløpModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const cls = BEMHelper('refusjonFullforNullbelop');
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    const fullførRefusjon = async (): Promise<void> => {
        return setVisRefusjonFullførNullbeløpModal(true);
    };

    const godkjennRefusjonen = async (): Promise<void> => {
        await godkjennRefusjonMedNullbeløp(refusjon.id, refusjon.sistEndret).then(() => {
            navigate({ pathname: `/refusjon/${refusjon.id}/kvittering`, search: window.location.search });
        });
    };

    const harFerietrekkIPerioden = refusjon.refusjonsgrunnlag.inntektsgrunnlag?.inntekter.find((i) => {
        if (i.måned) {
            const periode = Number(i.måned.slice(-2));
            return i.beskrivelse === 'trekkILoennForFerie' && periode === new Date().getMonth();
        }
        return false;
    });

    if (
        harFerietrekkIPerioden ||
        refusjon.refusjonsgrunnlag.inntektsgrunnlag?.inntekter.find((i) => i.erOpptjentIPeriode === true)
    ) {
        return null;
    }

    if (harFerietrekkIPerioden || refusjon.refusjonsgrunnlag.beregning) {
        return null;
    }

    return (
        <div className={cls.className}>
            <LagreKnapp variant="primary" lagreFunksjon={() => fullførRefusjon()}>
                Fullfør med nullbeløp
            </LagreKnapp>
            <RefusjonFullførNullbeløpModal
                refusjon={refusjon}
                visGodkjennModal={visRefusjonFullførNullbeløpModal}
                setVisGodkjennModal={setVisRefusjonFullførNullbeløpModal}
                godkjennRefusjonen={godkjennRefusjonen}
            />
        </div>
    );
};

export default RefusjonFullførNullbeløp;
