import { BodyShort, Table, Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import SortingValg from '../../../../../arbeidsgiver/src/refusjon/oversikt/SortingValg';
import { useFilter } from '../../../../../arbeidsgiver/src/refusjon/oversikt/FilterContext';
import BEMHelper from '../../../utils/bem';
import { SortingOrder } from '~/types/refusjon';

interface Props {



}

const cls = BEMHelper('oversikt');

const ArbeidsgiverTableHeader: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();

    const { filter } = useFilter();
    return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">
                        Tiltakstype
                        <SortingValg style={{marginRight:"5rem" ,display: 'block'}}
                            className={cls.className}
                            sortingAsc={SortingOrder.TILTAKSTYPE_ASC}
                            sortingDesc={SortingOrder.TILTAKSTYPE_DESC}
                            highlightSortOrderAsc={filter.sorting === SortingOrder.TILTAKSTYPE_ASC}
                            highlightSortOrderDesc={filter.sorting === SortingOrder.TILTAKSTYPE_DESC}
                        />
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col">
                        <Label className={cls.element('label')}>Bedrift</Label>
                        <SortingValg
                            className={cls.className}
                            sortingAsc={SortingOrder.BEDRIFT_ASC}
                            sortingDesc={SortingOrder.BEDRIFT_DESC}
                            highlightSortOrderAsc={filter.sorting === SortingOrder.BEDRIFT_ASC}
                            highlightSortOrderDesc={filter.sorting === SortingOrder.BEDRIFT_DESC}
                        />
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col">
                        <Label className={cls.element('label')}>Deltaker</Label>
                        <SortingValg
                            className={cls.className}
                            sortingAsc={SortingOrder.DELTAKER_ASC}
                            sortingDesc={SortingOrder.DELTAKER_DESC}
                            highlightSortOrderAsc={filter.sorting === SortingOrder.DELTAKER_ASC}
                            highlightSortOrderDesc={filter.sorting === SortingOrder.DELTAKER_DESC}
                        />
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col">
                        <Label className={cls.element('label')}>Periode</Label>
                        <SortingValg
                            className={cls.className}
                            sortingAsc={SortingOrder.PERIODE_ASC}
                            sortingDesc={SortingOrder.PERIODE_DESC}
                            highlightSortOrderAsc={filter.sorting === SortingOrder.PERIODE_ASC}
                            highlightSortOrderDesc={filter.sorting === SortingOrder.PERIODE_DESC}
                        />
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col">
                        <Label className={cls.element('label')}>Status</Label>
                        <SortingValg
                            className={cls.className}
                            sortingAsc={SortingOrder.STATUS_ASC}
                            sortingDesc={SortingOrder.STATUS_DESC}
                            highlightSortOrderAsc={
                                filter.sorting === SortingOrder.STATUS_ASC || filter.sorting === undefined
                            }
                            highlightSortOrderDesc={filter.sorting === SortingOrder.STATUS_DESC}
                        />
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col">
                        <Label className={cls.element('label')}>Frist for godkjenning</Label>
                        <SortingValg
                            className={cls.className}
                            sortingAsc={SortingOrder.FRISTFORGODKJENNING_ASC}
                            sortingDesc={SortingOrder.FRISTFORGODKJENNING_DESC}
                            highlightSortOrderAsc={filter.sorting === SortingOrder.FRISTFORGODKJENNING_ASC}
                            highlightSortOrderDesc={filter.sorting === SortingOrder.FRISTFORGODKJENNING_DESC}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
    );
}
export default ArbeidsgiverTableHeader;