import { BodyShort, Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusTekst from '~/StatusTekst';
import BEMHelper from '~/utils/bem';
import { formatterDato, formatterPeriode } from '~/utils';
import { Refusjon } from '~/types/refusjon';
import { storForbokstav } from '~/utils/stringUtils';
import { tiltakstypeTekst } from '~/types/messages';
import { NORSK_DATO_FORMAT_SHORT } from '~/utils/datoUtils';

type Props = {
    refusjoner: Refusjon[];
};
const cls = BEMHelper('oversiktTabell');

const TableBodyArbeidsgiver: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();

    return (
        <Table.Body>
            {props.refusjoner.map((refusjon) => (
                <Table.Row
                    key={refusjon.id}
                    onClick={(event) => {
                        event.preventDefault();
                        navigate({
                            pathname: `/refusjon/${refusjon.id}`,
                            search: window.location.search,
                        });
                    }}
                >
                    <Table.DataCell>
                        <BodyShort
                            size="small"
                            className={cls.element('title_row_column')}
                            aria-labelledby={cls.element('deltaker')}
                        >
                            {storForbokstav(
                                tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]
                            )}
                        </BodyShort>
                    </Table.DataCell>
                    <Table.DataCell>
                        <BodyShort
                            size="small"
                            className={cls.element('title_row_column')}
                            aria-labelledby={cls.element('deltaker')}
                        >
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.bedriftNavn}{' '}
                        </BodyShort>
                    </Table.DataCell>
                    <Table.DataCell>
                        <BodyShort
                            size="small"
                            className={cls.element('title_row_column')}
                            aria-labelledby={cls.element('deltaker')}
                        >
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn}{' '}
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}
                        </BodyShort>
                    </Table.DataCell>
                    <Table.DataCell>
                        <BodyShort
                            size="small"
                            className={cls.element('title_row_column')}
                            aria-labelledby={cls.element('periode')}
                        >
                            {formatterPeriode(
                                refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                                refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom,
                                NORSK_DATO_FORMAT_SHORT
                            )}
                        </BodyShort>
                    </Table.DataCell>
                    <Table.DataCell>
                        <div className={cls.element('title_row_column')}>
                            <StatusTekst
                                status={refusjon.status}
                                tiltakstype={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype}
                                tilskuddFom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom}
                                tilskuddTom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom}
                                fratrekkRefunderbarBeløp={refusjon.refusjonsgrunnlag.fratrekkRefunderbarBeløp}
                            />
                        </div>
                    </Table.DataCell>
                    <Table.DataCell>
                        <BodyShort
                            size="small"
                            className={cls.element('title_row_column')}
                            aria-labelledby={cls.element('frist-godkjenning')}
                        >
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype !== 'VTAO'
                                ? formatterDato(refusjon.fristForGodkjenning)
                                : ''}
                        </BodyShort>
                    </Table.DataCell>
                </Table.Row>
            ))}
        </Table.Body>

    );
};

export default TableBodyArbeidsgiver;
