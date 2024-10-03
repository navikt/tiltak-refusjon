import React from 'react';
import BEMHelper from '../../utils/bem';
import './LabelRad.less';
import { Label } from '@navikt/ds-react';

const LabelRad = () => {
    const cls = BEMHelper('label-rad');
    return (
        <div className={cls.className} aria-label="rad overkrifter for kolonnene i refusonslisten">
            <div className={cls.element('kolonne')} id={cls.element('refusjon')}>
                <Label>Refusjon</Label>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('veileder')}>
                <Label>Veileder</Label>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('deltaker')}>
                <Label>Deltaker</Label>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('arbeidsgiver')}>
                <Label>Arbeidsgiver</Label>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('Enhet')}>
                <Label>Enhet</Label>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('status')}>
                <Label>Status</Label>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('frist-godkjenning')}>
                <Label>Frist for godkjenning</Label>
            </div>
        </div>
    );
};

export default LabelRad;
