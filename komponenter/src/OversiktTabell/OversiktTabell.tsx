import { Table } from '@navikt/ds-react';
import { FunctionComponent, ReactElement } from 'react';
import BEMHelper from '../utils/bem';
import './OversiktTabell.less';
import TableHeader from './TableHeader';

interface Props {
    tableHeader: ReactElement;
    tableBody: ReactElement;
    
};

const cls = BEMHelper('oversiktTabell');

const OversiktTabell: FunctionComponent<Props> = ({tableHeader, tableBody}) => {

    return (
        <Table className={cls.className}>
            {tableHeader}
            {tableBody}
        </Table>
    );
};

export default OversiktTabell;
