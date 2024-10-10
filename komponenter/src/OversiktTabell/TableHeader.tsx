import { Table } from '@navikt/ds-react';

const TableHeader = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell scope="col">
                Refusjon
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                Veileder
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                Deltaker
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                Arbeidsgiver
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                Enhet
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                Status
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                Frist for godkjenning
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
};

export default TableHeader;
