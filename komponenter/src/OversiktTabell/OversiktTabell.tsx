import { Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import BEMHelper from '../utils/bem';
import { Refusjon } from '../types/refusjon';
import './OversiktTabell.less';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

type Props = {
    refusjoner: Refusjon[];
};
const cls = BEMHelper('oversiktTabell');

const OversiktTabell: FunctionComponent<Props> = (props) => {

    return (
        <Table>
            <TableHeader/>
            <TableBody refusjoner={props.refusjoner}/>
        </Table>
    );
};

export default OversiktTabell;
