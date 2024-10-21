import React, { FunctionComponent } from 'react';
import { useInnloggetBruker } from '../../bruker/BrukerContext';
import { useHentRefusjoner } from '../../services/rest-service';
import { antallRefusjoner } from '../../utils/amplitude-utils';
import { useFilter } from './FilterContext';
import FinnerIngenRefusjoner from './FinnerIngenRefusjon/FinnerIngenRefusjoner';
import { BrukerContextType } from '../../bruker/BrukerContextType';
import useOppdaterPagedata from '../../bruker/bedriftsmenyRefusjon/useOppdaterPagedata';
import OversiktTabell from '~/OversiktTabell';
import ArbeidsgiverTableBody from '~/OversiktTabell/TableBody/ArbeidsgiverTableBody';
import ArbeidsgiverTableHeader from '~/OversiktTabell/TableHeader/ArbeidsgiverTableHeader';


import { LinkPanel, Pagination , BodyShort} from '@navikt/ds-react';
import './Oversikt.less';
import BEMHelper from '~/utils/bem';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT_SHORT } from '~/utils';
import StatusTekst from '~/StatusTekst/StatusTekst';
import { useNavigate } from 'react-router-dom';
const cls = BEMHelper('oversikt');

const Oversikt: FunctionComponent = () => {
    const brukerContext: BrukerContextType = useInnloggetBruker();
    const { setValgtBedrift, valgtBedrift } = brukerContext;
    const { filter, oppdaterFilter } = useFilter();
    const pageable = useHentRefusjoner(brukerContext, filter);
    const { refusjoner } = pageable;
    const navigate = useNavigate();
    useOppdaterPagedata(pageable, valgtBedrift, setValgtBedrift);
    antallRefusjoner(refusjoner.length > 0 ? refusjoner.length : 0);

    return (
        <nav className={cls.className} aria-label="Main">
                {refusjoner.length > 0 ? (
                    <>
                            {pageable.refusjoner.map((refusjon) => (
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
                            ))}

                        <OversiktTabell tableHeader={<ArbeidsgiverTableHeader filter={filter} oppdaterFilter={oppdaterFilter} />} tableBody={<ArbeidsgiverTableBody refusjoner={pageable.refusjoner}/>} />
                       
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                            <Pagination className={cls.element('pagination')}
                                page={pageable.currentPage + 1}
                                onPageChange={(x) => oppdaterFilter({ page: x - 1 })}
                                count={pageable.totalPages}
                                boundaryCount={1}
                                siblingCount={1}
                            />
                        </div>
                    </>
                ) : (
                    <FinnerIngenRefusjoner orgnr={brukerContext.valgtBedrift.valgtOrg?.[0].OrganizationNumber} />
                )}
        </nav>
    );
};

export default Oversikt;
