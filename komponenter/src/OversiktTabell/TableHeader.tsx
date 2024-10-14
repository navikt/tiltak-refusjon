import { Table } from '@navikt/ds-react';
import { FunctionComponent, useEffect } from 'react';

interface Props {
    cellHeaders: string[];
}


const TableHeader: FunctionComponent<Props> = ({cellHeaders}) => {
    return (
        <Table.Header>
            <Table.Row>
                {cellHeaders.map((header) => (
                    <Table.HeaderCell scope="col" key={header}>
                        {header}
                    </Table.HeaderCell>
                ))}
            </Table.Row>
        </Table.Header>
    );
};

export default TableHeader;
