import { BodyShort, Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router';
import StatusTekst from '~/StatusTekst';
import { tiltakstypeTekstKort } from '~/types/messages';
import { BegrensetRefusjon } from '~/types/refusjon';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT_SHORT } from '~/utils';
import BEMHelper from '~/utils/bem';
import { kunStorForbokstav } from '~/utils/stringUtils';
import NavnMedDiskresjonskode from '~/OversiktTabell/NavnMedDiskresjonskode';

type Props = {
    refusjoner: BegrensetRefusjon[];
};
const cls = BEMHelper('oversiktTabell');

const TabellBodySaksbehandler: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();

    const navigerTilRefusjonEllerKorreksjon = (refusjon: BegrensetRefusjon) => {
        if (refusjon.korreksjonId) {
            navigate({
                pathname: `/korreksjon/${refusjon.korreksjonId}`,
                search: window.location.search,
            });
        } else {
            navigate({
                pathname: `/refusjon/${refusjon.id}`,
                search: window.location.search,
            });
        }
    };

    return (
        <Table.Body>
            {props.refusjoner.map((refusjon) => (
                <Table.Row
                    key={refusjon.id}
                    onClick={(event) => {
                        event.preventDefault();
                        navigerTilRefusjonEllerKorreksjon(refusjon);
                    }}
                >
                    <Table.DataCell>
                        <BodyShort size="small" aria-labelledby={cls.element('deltaker')}>
                            {kunStorForbokstav(
                                tiltakstypeTekstKort[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]
                            )}
                        </BodyShort>
                    </Table.DataCell>
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
                            <NavnMedDiskresjonskode
                                fornavn={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn}
                                etternavn={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}
                                diskresjonskode={refusjon.diskresjonskode}
                            ></NavnMedDiskresjonskode>
                        </BodyShort>
                    </Table.DataCell>
                    <Table.DataCell>
                        <BodyShort size="small" aria-labelledby={cls.element('periode')}>
                            {formatterPeriode(
                                refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                                refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom,
                                NORSK_DATO_FORMAT_SHORT
                            )}
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
                        <StatusTekst
                            status={refusjon.status}
                            tiltakstype={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype}
                            tilskuddFom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom}
                            tilskuddTom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom}
                            fratrekkRefunderbarBeløp={refusjon.refusjonsgrunnlag.fratrekkRefunderbarBeløp}
                        />
                    </Table.DataCell>
                    <Table.DataCell>
                        <BodyShort size="small" aria-labelledby={cls.element('frist-godkjenning')}>
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

export default TabellBodySaksbehandler;
