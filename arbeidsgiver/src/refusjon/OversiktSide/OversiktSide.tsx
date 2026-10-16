import React, { FunctionComponent } from 'react';
import BEMHelper from '~/utils/bem';
import Filtermeny from '~/Filtermeny/Filtermeny';
import Oversikt from '@/refusjon/oversikt/Oversikt';
import { useFilter } from '@/refusjon/oversikt/FilterContext';
import IkkeTilgang403ErrorBoundary from '~/IkkeTilgang403ErrorBoundary';
import { Path } from '@/router/Router';
import { OversiktsTabellSuspense } from '~/OversiktTabell';
import './OversiktSide.less';
import { MainContainer } from '~/Container';

const cls = BEMHelper('OversiktSide');

const OversiktSide: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();
    const options = {
        erArbeidsgiver: true,
        harKorreksjonTilgang: false,
    };

    return (
        <MainContainer bredde="2xl">
            <div className={cls.className}>
                <div className={cls.element('wrapper')}>
                    <div className={cls.element('meny')}>
                        <Filtermeny filter={filter} oppdaterFilter={oppdaterFilter} options={options} />
                    </div>
                    <div className={cls.element('container')}>
                        <IkkeTilgang403ErrorBoundary filter={filter} pathTilForside={Path.REFUSJON_OVERSIKT}>
                            <OversiktsTabellSuspense>
                                <Oversikt />
                            </OversiktsTabellSuspense>
                        </IkkeTilgang403ErrorBoundary>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default OversiktSide;
