import ErlikTegn from '@/asset/image/erlikTegn.svg?react';
import MinusTegn from '@/asset/image/minusTegn.svg?react';
import { Heading, Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import '../refusjon/RefusjonSide/Utregning.less';
import { Tilskuddsgrunnlag } from '~/types/refusjon';
import BEMHelper from '~/utils/bem';
import VerticalSpacer from '~/VerticalSpacer';
import { formatterPenger } from '~/utils/PengeUtils';

const KorreksjonUtregningVTAO: FunctionComponent<{ tilskuddsgrunnlag: Tilskuddsgrunnlag }> = ({
    tilskuddsgrunnlag,
}) => {
    const cls = BEMHelper('utregning');

    return (
        <div className={cls.className}>
            <Heading level="3" size="medium">
                Utregningen
            </Heading>
            <VerticalSpacer rem={1} />
            <Table zebraStripes>
                <Table.Body>
                    <Table.Row shadeOnHover={false}>
                        <Table.DataCell>Refusjonsgrunnlag</Table.DataCell>
                        <Table.DataCell style={{ width: '1rem' }}></Table.DataCell>
                        <Table.DataCell align="right" style={{ width: '7rem' }}>
                            {formatterPenger(Math.abs(tilskuddsgrunnlag.tilskuddsbeløp))}
                        </Table.DataCell>
                    </Table.Row>
                    <Table.Row shadeOnHover={false}>
                        <Table.DataCell>Refusjonsbeløp til utbetaling</Table.DataCell>
                        <Table.DataCell style={{ width: '1rem' }}>
                            <ErlikTegn height={'0.80rem'} width={'0.80rem'} />{' '}
                        </Table.DataCell>
                        <Table.DataCell align="right" style={{ width: '7rem' }}>
                            <MinusTegn height={'0.80rem'} width={'0.80rem'} />
                            {formatterPenger(Math.abs(tilskuddsgrunnlag.tilskuddsbeløp))}
                        </Table.DataCell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
};

export default KorreksjonUtregningVTAO;
