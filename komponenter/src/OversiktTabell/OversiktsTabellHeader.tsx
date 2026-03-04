import { Table, Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import styles from './OversiktsTabell.module.less';
import { RefusjonSortState, TableHeaderType } from './OversiktsTabell';

interface Props {
    headers: TableHeaderType[];
    sort?: RefusjonSortState;
}

const sortToText = (sort?: RefusjonSortState, header?: TableHeaderType) => {
    if (!sort || sort.orderBy !== header?.navn) {
        return '';
    }
    switch (sort.direction) {
        case 'ascending':
            return ' - stigende';
        case 'descending':
            return ' - synkende';
        default:
            return '';
    }
};

const OversiktsTabellHeader: FunctionComponent<Props> = ({ headers, sort }) => {
    return (
        <Table.Header>
            <Table.Row className={styles.tableRow}>
                {headers.map((header) => (
                    <Table.ColumnHeader
                        key={header.navn}
                        sortable
                        sortKey={header.navn}
                        className={styles.tableHeader}
                        title={header.beskrivelse + sortToText(sort, header)}
                    >
                        <Label aria-label={header.beskrivelse}>{header.navn}</Label>
                    </Table.ColumnHeader>
                ))}
            </Table.Row>
        </Table.Header>
    );
};

export default OversiktsTabellHeader;
