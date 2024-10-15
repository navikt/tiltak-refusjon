import { Table } from '@navikt/ds-react';
import { FunctionComponent, ReactElement } from 'react';
import BEMHelper from '../utils/bem';
import './OversiktTabell.less';

interface Props {
    tableHeader: React.ReactElement;
    tableBody: React.ReactElement;
    
};

const cls = BEMHelper('oversiktTabell');

const OversiktTabell: FunctionComponent<Props> = ({tableHeader, tableBody}) => {

    return (
        <Table role='list' className={cls.className}>
            {tableHeader}
            {tableBody}
        </Table>
    );
};

export default OversiktTabell;
