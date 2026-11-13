import React, { FunctionComponent, useEffect } from 'react';
import BEMHelper from '~/utils/bem';
import Filtermeny from '~/Filtermeny/Filtermeny';
import Oversikt from '@/refusjon/oversikt/Oversikt';
import { useFilter } from '@/refusjon/oversikt/FilterContext';
import IkkeTilgang403ErrorBoundary from '~/IkkeTilgang403ErrorBoundary';
import { Path } from '@/router/Router';
import { useFeatureToggles } from '@/featureToggles';
import { OversiktsTabellSuspense } from '~/OversiktTabell';
import './OversiktSide.less';
import { MainContainer } from '~/Container';
import { Tiltak } from '~/types/tiltak';

const cls = BEMHelper('OversiktSide');

const OversiktSide: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();
    const { inkluderingstilskuddRefusjon, laster } = useFeatureToggles();
    const options = {
        erArbeidsgiver: true,
        harKorreksjonTilgang: false,
    };

    useEffect(() => {
        if (!laster && !inkluderingstilskuddRefusjon && filter.tiltakstype === Tiltak.INKLUDERINGSTILSKUDD) {
            oppdaterFilter({ tiltakstype: undefined }, true);
        }
    }, [laster, inkluderingstilskuddRefusjon, filter.tiltakstype, oppdaterFilter]);

    return (
        <MainContainer bredde="2xl">
            <div className={cls.className}>
                <div className={cls.element('wrapper')}>
                    <div className={cls.element('meny')}>
                        <Filtermeny
                            filter={filter}
                            oppdaterFilter={oppdaterFilter}
                            options={options}
                            visInkluderingstilskudd={inkluderingstilskuddRefusjon}
                        />
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
