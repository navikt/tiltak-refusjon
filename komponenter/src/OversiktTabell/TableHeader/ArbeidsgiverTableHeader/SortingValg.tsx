import React, { FunctionComponent, PropsWithChildren } from 'react';
import { SortingOrder } from '~/types/refusjon';
import TriangleUp from '~/assets/image/triangleUp.svg?react';
import TriangleDown from '~/assets/image/triangleDown.svg?react';
import BEMHelper from '~/utils/bem';
import './SortingValg.less';
import { Filter } from '~/types/refusjon';

interface SortingProps {
    className: string;
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    sortingAsc: SortingOrder;
    sortingDesc: SortingOrder;
    highlightSortOrderAsc: boolean;
    highlightSortOrderDesc: boolean;
}

const SortingValg: FunctionComponent<SortingProps> = (props: PropsWithChildren<SortingProps>) => {
    const cls = BEMHelper('sortingValg');

    const { filter, oppdaterFilter, sortingDesc, sortingAsc, highlightSortOrderAsc, highlightSortOrderDesc } = props;

    return (
        <span className={cls.element('label-sortering')}>
            <TriangleUp
                className={cls.element('sortering', highlightSortOrderAsc ? 'asc-selected' : 'asc')}
                onClick={() => oppdaterFilter({ ...filter, sorting: sortingAsc })}
            />
            <TriangleDown
                className={cls.element('sortering', highlightSortOrderDesc ? 'desc-selected' : 'desc')}
                onClick={() => oppdaterFilter({ ...filter, sorting: sortingDesc })}
            />
        </span>
    );
};
export default SortingValg;
