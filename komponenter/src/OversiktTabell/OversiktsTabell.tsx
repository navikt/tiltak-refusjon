import { SortState, Table } from '@navikt/ds-react';
import { BegrensetRefusjon, Filter, SortingOrder } from '~/types';
import OversiktsTabellHeader from './OversiktsTabellHeader';
import OversiktsTabellBody from './OversiktsTabellBody';
import styles from './OversiktsTabell.module.less';

export type Avtalepart = 'saksbehandler' | 'arbeidsgiver';

interface Props {
    filter: Filter;
    oppdaterFilter: (nyttFilter: Partial<Filter>) => void;
    refusjoner: BegrensetRefusjon[];
    avtalepart: Avtalepart;
}

export type TableHeaderType = {
    navn: string;
    beskrivelse: string;
};

export const tableHeaders: TableHeaderType[] = [
    { navn: 'Refusjon', beskrivelse: 'Refusjonsnummer' },
    { navn: 'Tiltakstype', beskrivelse: 'Tiltakstype' },
    { navn: 'Bedrift', beskrivelse: 'Bedrift' },
    { navn: 'Deltaker', beskrivelse: 'Deltaker' },
    { navn: 'Periode', beskrivelse: 'Periode' },
    { navn: 'Status', beskrivelse: 'Status' },
    { navn: 'Frist', beskrivelse: 'Frist for godkjenning' },
];

export interface RefusjonSortState extends SortState {
    orderBy: (typeof tableHeaders)[number]['navn'];
}

const getSortingOrder = (sort?: RefusjonSortState): SortingOrder | undefined => {
    if (!sort || sort.direction === 'none') {
        return undefined;
    }
    switch (sort.orderBy) {
        case 'Refusjon':
            return sort.direction === 'ascending'
                ? SortingOrder.REFUSJONSNUMMER_ASC
                : SortingOrder.REFUSJONSNUMMER_DESC;
        case 'Tiltakstype':
            return sort.direction === 'ascending' ? SortingOrder.TILTAKSTYPE_ASC : SortingOrder.TILTAKSTYPE_DESC;
        case 'Bedrift':
            return sort.direction === 'ascending' ? SortingOrder.BEDRIFT_ASC : SortingOrder.BEDRIFT_DESC;
        case 'Deltaker':
            return sort.direction === 'ascending' ? SortingOrder.DELTAKER_ASC : SortingOrder.DELTAKER_DESC;
        case 'Periode':
            return sort.direction === 'ascending' ? SortingOrder.PERIODE_ASC : SortingOrder.PERIODE_DESC;
        case 'Status':
            return sort.direction === 'ascending' ? SortingOrder.STATUS_ASC : SortingOrder.STATUS_DESC;
        case 'Frist':
            return sort.direction === 'ascending'
                ? SortingOrder.FRISTFORGODKJENNING_ASC
                : SortingOrder.FRISTFORGODKJENNING_DESC;
        default:
            return undefined;
    }
};

const getSortState = (sorting?: SortingOrder): RefusjonSortState | undefined => {
    switch (sorting) {
        case SortingOrder.REFUSJONSNUMMER_ASC:
            return { orderBy: 'Refusjon', direction: 'ascending' };
        case SortingOrder.REFUSJONSNUMMER_DESC:
            return { orderBy: 'Refusjon', direction: 'descending' };
        case SortingOrder.TILTAKSTYPE_ASC:
            return { orderBy: 'Tiltakstype', direction: 'ascending' };
        case SortingOrder.TILTAKSTYPE_DESC:
            return { orderBy: 'Tiltakstype', direction: 'descending' };
        case SortingOrder.BEDRIFT_ASC:
            return { orderBy: 'Bedrift', direction: 'ascending' };
        case SortingOrder.BEDRIFT_DESC:
            return { orderBy: 'Bedrift', direction: 'descending' };
        case SortingOrder.DELTAKER_ASC:
            return { orderBy: 'Deltaker', direction: 'ascending' };
        case SortingOrder.DELTAKER_DESC:
            return { orderBy: 'Deltaker', direction: 'descending' };
        case SortingOrder.PERIODE_ASC:
            return { orderBy: 'Periode', direction: 'ascending' };
        case SortingOrder.PERIODE_DESC:
            return { orderBy: 'Periode', direction: 'descending' };
        case SortingOrder.STATUS_ASC:
            return { orderBy: 'Status', direction: 'ascending' };
        case SortingOrder.STATUS_DESC:
            return { orderBy: 'Status', direction: 'descending' };
        case SortingOrder.FRISTFORGODKJENNING_ASC:
            return { orderBy: 'Frist', direction: 'ascending' };
        case SortingOrder.FRISTFORGODKJENNING_DESC:
            return { orderBy: 'Frist', direction: 'descending' };
        default:
            return undefined;
    }
};

const OversiktsTabell = (props: Props) => {
    const { filter, oppdaterFilter, refusjoner, avtalepart } = props;
    const sort = getSortState(filter.sorting);

    const handleSort = (sortkey: string) => {
        let nextSort: RefusjonSortState | undefined;
        if (sort?.orderBy !== sortkey) {
            nextSort = { orderBy: sortkey, direction: 'ascending' };
        } else {
            switch (sort.direction) {
                case 'ascending':
                    nextSort = { orderBy: sortkey, direction: 'descending' };
                    break;
                case 'descending':
                    nextSort = undefined;
                    break;
                default:
                    nextSort = { orderBy: sortkey, direction: 'ascending' };
            }
        }

        oppdaterFilter({ sorting: getSortingOrder(nextSort) });
    };

    return (
        <Table role="list" className={styles.oversiktTabell} sort={sort} onSortChange={handleSort}>
            <OversiktsTabellHeader headers={tableHeaders} sort={sort} />
            <OversiktsTabellBody refusjoner={refusjoner} avtalepart={avtalepart} />
        </Table>
    );
};

export default OversiktsTabell;
