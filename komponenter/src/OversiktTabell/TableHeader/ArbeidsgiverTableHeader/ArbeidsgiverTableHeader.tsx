import { Table, Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import SortingValg from './SortingValg';
import BEMHelper from '../../../utils/bem';
import { Filter, SortingOrder } from '~/types/filter';

interface Props {
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
}

const cls = BEMHelper('oversikt');

const ArbeidsgiverTableHeader: FunctionComponent<Props> = ({ filter, oppdaterFilter }) => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell scope="col">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Label>Tiltakstype</Label>
                        <SortingValg
                            className={cls.className}
                            filter={filter}
                            oppdaterFilter={oppdaterFilter}
                            sortingAsc={SortingOrder.TILTAKSTYPE_ASC}
                            sortingDesc={SortingOrder.TILTAKSTYPE_DESC}
                            highlightSortOrderAsc={filter.sorting === SortingOrder.TILTAKSTYPE_ASC}
                            highlightSortOrderDesc={filter.sorting === SortingOrder.TILTAKSTYPE_DESC}
                        />
                    </div>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Label>Bedrift</Label>
                        <SortingValg
                            className={cls.className}
                            filter={filter}
                            oppdaterFilter={oppdaterFilter}
                            sortingAsc={SortingOrder.BEDRIFT_ASC}
                            sortingDesc={SortingOrder.BEDRIFT_DESC}
                            highlightSortOrderAsc={filter.sorting === SortingOrder.BEDRIFT_ASC}
                            highlightSortOrderDesc={filter.sorting === SortingOrder.BEDRIFT_DESC}
                        />
                    </div>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Label className={cls.element('label')}>Deltaker</Label>
                        <SortingValg
                            className={cls.className}
                            filter={filter}
                            oppdaterFilter={oppdaterFilter}
                            sortingAsc={SortingOrder.DELTAKER_ASC}
                            sortingDesc={SortingOrder.DELTAKER_DESC}
                            highlightSortOrderAsc={filter.sorting === SortingOrder.DELTAKER_ASC}
                            highlightSortOrderDesc={filter.sorting === SortingOrder.DELTAKER_DESC}
                        />
                    </div>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Label className={cls.element('label')}>Periode</Label>
                        <SortingValg
                            className={cls.className}
                            filter={filter}
                            oppdaterFilter={oppdaterFilter}
                            sortingAsc={SortingOrder.PERIODE_ASC}
                            sortingDesc={SortingOrder.PERIODE_DESC}
                            highlightSortOrderAsc={filter.sorting === SortingOrder.PERIODE_ASC}
                            highlightSortOrderDesc={filter.sorting === SortingOrder.PERIODE_DESC}
                        />
                    </div>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Label className={cls.element('label')}>Status</Label>
                        <SortingValg
                            className={cls.className}
                            filter={filter}
                            oppdaterFilter={oppdaterFilter}
                            sortingAsc={SortingOrder.STATUS_ASC}
                            sortingDesc={SortingOrder.STATUS_DESC}
                            highlightSortOrderAsc={
                                filter.sorting === SortingOrder.STATUS_ASC || filter.sorting === undefined
                            }
                            highlightSortOrderDesc={filter.sorting === SortingOrder.STATUS_DESC}
                        />
                    </div>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Label className={cls.element('label')}>Frist for godkjenning</Label>
                        <SortingValg
                            className={cls.className}
                            filter={filter}
                            oppdaterFilter={oppdaterFilter}
                            sortingAsc={SortingOrder.FRISTFORGODKJENNING_ASC}
                            sortingDesc={SortingOrder.FRISTFORGODKJENNING_DESC}
                            highlightSortOrderAsc={filter.sorting === SortingOrder.FRISTFORGODKJENNING_ASC}
                            highlightSortOrderDesc={filter.sorting === SortingOrder.FRISTFORGODKJENNING_DESC}
                        />
                    </div>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
};
export default ArbeidsgiverTableHeader;
