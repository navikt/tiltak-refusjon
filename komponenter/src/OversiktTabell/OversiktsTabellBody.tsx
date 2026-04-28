import { Table } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router';
import StatusTekst from '~/StatusTekst';
import { formaterDato, formaterPeriode } from '~/utils';
import { BegrensetRefusjon } from '~/types/refusjon';
import { kunStorForbokstav } from '~/utils/stringUtils';
import { tiltakstypeTekstKort } from '~/types/messages';
import { NORSK_DATO_FORMAT_SHORT } from '~/utils/datoUtils';
import { Avtalepart } from './OversiktsTabell';
import styles from './OversiktsTabell.module.less';
import NavnMedDiskresjonskode from './NavnMedDiskresjonskode';
import { Tiltak } from '~/types/tiltak';

type Props = {
    refusjoner: BegrensetRefusjon[];
    avtalepart: Avtalepart;
};

const OversiktsTabellBody: FunctionComponent<Props> = ({ refusjoner, avtalepart }) => {
    const navigate = useNavigate();

    const navigerTilRefusjonEllerKorreksjon = (refusjon: BegrensetRefusjon, avtalepart: Avtalepart) => {
        if (refusjon.korreksjonId && avtalepart === 'saksbehandler') {
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

    function skalViseGodkjenningsfrist(refusjon: BegrensetRefusjon) {
        return ![Tiltak.VTAO, Tiltak.MENTOR].includes(refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype);
    }

    function hentFulltRefusjonsnummer(refusjon: BegrensetRefusjon) {
        const { avtaleNr, løpenummer, resendingsnummer } = refusjon.refusjonsgrunnlag.tilskuddsgrunnlag;
        if (resendingsnummer) {
            return `${avtaleNr}-${løpenummer}-R${resendingsnummer}`;
        }
        return `${avtaleNr}-${løpenummer}`;
    }

    return (
        <Table.Body>
            {refusjoner?.map((refusjon) => (
                <Table.Row
                    className={styles.tableRow}
                    key={refusjon.id}
                    onClick={(event) => {
                        event.preventDefault();
                        navigerTilRefusjonEllerKorreksjon(refusjon, avtalepart);
                    }}
                >
                    <Table.DataCell textSize="small">{hentFulltRefusjonsnummer(refusjon)}</Table.DataCell>
                    <Table.DataCell textSize="small">
                        {kunStorForbokstav(
                            tiltakstypeTekstKort[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]
                        )}
                    </Table.DataCell>
                    <Table.DataCell textSize="small">
                        {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.bedriftNavn}
                    </Table.DataCell>
                    <Table.DataCell textSize="small">
                        <NavnMedDiskresjonskode
                            fornavn={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn}
                            etternavn={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}
                            diskresjonskode={refusjon.diskresjonskode}
                        />
                    </Table.DataCell>
                    <Table.DataCell textSize="small">
                        {formaterPeriode(
                            refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                            refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom,
                            NORSK_DATO_FORMAT_SHORT
                        )}
                    </Table.DataCell>
                    <Table.DataCell textSize="small">
                        <StatusTekst
                            status={refusjon.status}
                            tiltakstype={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype}
                            tilskuddFom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom}
                            tilskuddTom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom}
                            fratrekkRefunderbarBeløp={refusjon.refusjonsgrunnlag.fratrekkRefunderbarBeløp}
                        />
                    </Table.DataCell>
                    <Table.DataCell textSize="small">
                        {skalViseGodkjenningsfrist(refusjon) ? formaterDato(refusjon.fristForGodkjenning) : ''}
                    </Table.DataCell>
                </Table.Row>
            ))}
        </Table.Body>
    );
};

export default OversiktsTabellBody;
