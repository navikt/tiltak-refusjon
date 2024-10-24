import { BodyShort, Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusTekst from '../StatusTekst';
import BEMHelper from '../utils/bem';
import { formatterDato } from '../utils';
import { Refusjon } from '../types/refusjon';

type Props = {
    refusjoner: Refusjon[];
};
const cls = BEMHelper('oversiktTabell');

const TabellBodySaksbehandler: FunctionComponent<Props> = (props) => {
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
                        <BodyShort size="small" aria-labelledby={cls.element('refusjon')}>
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr}-
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer}
                        </BodyShort>
                    </Table.DataCell>
                    <Table.DataCell>
                        <BodyShort size="small" aria-labelledby={cls.element('veileder')}>
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.veilederNavIdent}
                        </BodyShort>
                    </Table.DataCell>
                    <Table.DataCell>
                        <BodyShort size="small" aria-labelledby={cls.element('deltaker')}>
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn}{' '}
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}
                        </BodyShort>
                    </Table.DataCell>
                    <Table.DataCell>
                        <BodyShort size="small" aria-labelledby={cls.element('arbeidsgiver')}>
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.bedriftNavn}
                        </BodyShort>
                    </Table.DataCell>
                    <Table.DataCell>
                        <BodyShort size="small" aria-labelledby={cls.element('enhet')}>
                            <strong>{refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet}</strong>
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
                        <BodyShort size="small" aria-labelledby={cls.element('frist-godkjenning')}>
                            {formatterDato(refusjon.fristForGodkjenning)}
                        </BodyShort>
                    </Table.DataCell>
                </Table.Row>
            ))}
        </Table.Body>
    );
};

export default TabellBodySaksbehandler;
