import { Table } from '@navikt/ds-react';
import { FunctionComponent, ReactNode } from 'react';
import BEMHelper from '../utils/bem';
import './OversiktTabell.less';

interface Props {
    className?: string;
    tableHeader?: React.ReactNode;
    tableBody?: React.ReactNode;
}

const cls = BEMHelper('oversiktTabell');

const OversiktTabell: FunctionComponent<Props> = ({ tableHeader, tableBody }) => {
    return (
        <Table role="list" className={cls.className}>
            {tableHeader}
            {tableBody}
        </Table>
    );
};

export default OversiktTabell;
