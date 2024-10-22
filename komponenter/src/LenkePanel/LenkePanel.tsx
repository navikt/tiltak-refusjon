import BEMHelper from '~/utils/bem';
import React, { FunctionComponent } from 'react';
import { LinkPanel, Pagination, BodyShort } from '@navikt/ds-react';
import { Refusjon } from '~/types/refusjon';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT_SHORT } from '~/utils';
import StatusTekst from '~/StatusTekst/StatusTekst';
import { useNavigate } from 'react-router-dom';
interface Props {
    refusjoner: Refusjon[];
}
const LenkePanel: FunctionComponent<Props> = ({ refusjoner }) => {
    const cls = BEMHelper('oversikt');
    const navigate = useNavigate();
    return refusjoner.map((refusjon) => (
        <LinkPanel
            className={cls.element('linkPanel')}
            border={false}
            role="listitem"
            key={refusjon.id}
            onClick={(event) => {
                event.preventDefault();
                navigate({
                    pathname: `/refusjon/${refusjon.id}`,
                    search: window.location.search,
                });
            }}
            href={`/refusjon/${refusjon.id}`}
        >
            <LinkPanel.Title className={cls.element('linkpanel_title_row')}>
                <BodyShort
                    size="small"
                    className={cls.element('title_row_column')}
                    aria-labelledby={cls.element('deltaker')}
                >
                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn}{' '}
                    {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}
                </BodyShort>
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
                <div className={cls.element('title_row_column')}>
                    <StatusTekst
                        tiltakstype={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype}
                        status={refusjon.status}
                        tilskuddFom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom}
                        tilskuddTom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom}
                        fratrekkRefunderbarBeløp={refusjon.refusjonsgrunnlag.fratrekkRefunderbarBeløp}
                    />
                </div>
                <BodyShort
                    size="small"
                    className={cls.element('title_row_column')}
                    aria-labelledby={cls.element('frist-godkjenning')}
                >
                    {formatterDato(refusjon.fristForGodkjenning)}
                </BodyShort>
            </LinkPanel.Title>
        </LinkPanel>
    ));
};

export default LenkePanel;
