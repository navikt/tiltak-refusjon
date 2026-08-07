import { FunctionComponent, useState } from 'react';
import { ActionMenu, Box, Button } from '@navikt/ds-react';
import { BulletListIcon, ChevronDownIcon, ForwardIcon, NotePencilDashIcon, WalletIcon } from '@navikt/aksel-icons';
import { useInnloggetBruker } from '@/bruker/BrukerContext';
import ForlengFrist from '@/refusjon/ForlengFrist/ForlengFristModal';
import HendelsesLogg from '@/refusjon/Hendelseslogg/HendelsesLoggModal';
import MerkForUnntakOmInntekterFremITid from '@/refusjon/MerkForUnntakOmInntekterFremITid/MerkForUnntakOmInntekterFremITidModal';
import OpprettKorreksjonModal from '~/knapp/OpprettKorreksjonModal';
import { Korreksjonsgrunn, Refusjon } from '~/types/refusjon';
import { RefusjonStatus } from '~/types';

type ActiveModal = 'hendelseslogg' | 'forlengFrist' | 'inntekter' | 'korreksjon' | null;

interface Props {
    refusjon: Refusjon;
    visHandlinger?: boolean;
    opprettKorreksjon?: (
        grunner: Korreksjonsgrunn[],
        unntakOmInntekterFremitid?: number,
        annenKorreksjonsGrunn?: string
    ) => Promise<void>;
}

const HandlingerMeny: FunctionComponent<Props> = ({ refusjon, visHandlinger = false, opprettKorreksjon }) => {
    const { innloggetBruker } = useInnloggetBruker();
    const [activeModal, setActiveModal] = useState<ActiveModal>(null);

    const visKorreksjon =
        !!opprettKorreksjon &&
        !!innloggetBruker.harKorreksjonTilgang &&
        refusjon.status !== RefusjonStatus.UTBETALING_FEILET &&
        !refusjon.korreksjonId;

    return (
        <Box>
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button size="medium" variant="secondary" icon={<ChevronDownIcon />} iconPosition="right">
                        Meny
                    </Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    {visHandlinger && (
                        <ActionMenu.Group aria-label="Handlinger">
                            <ActionMenu.Item onSelect={() => setActiveModal('forlengFrist')}>
                                <ForwardIcon />
                                Forleng frist
                            </ActionMenu.Item>
                            {innloggetBruker.harKorreksjonTilgang && (
                                <ActionMenu.Item onSelect={() => setActiveModal('inntekter')}>
                                    <WalletIcon />
                                    Hent inntekter for senere perioder
                                </ActionMenu.Item>
                            )}
                        </ActionMenu.Group>
                    )}
                    {visKorreksjon && (
                        <ActionMenu.Group aria-label="Korreksjon">
                            <ActionMenu.Item onSelect={() => setActiveModal('korreksjon')}>
                                <NotePencilDashIcon />
                                Opprett korreksjonsutkast
                            </ActionMenu.Item>
                        </ActionMenu.Group>
                    )}
                    {(visHandlinger || visKorreksjon) && <ActionMenu.Divider />}
                    <ActionMenu.Group aria-label="Logg">
                        <ActionMenu.Item onSelect={() => setActiveModal('hendelseslogg')}>
                            <BulletListIcon />
                            Hendelseslogg
                        </ActionMenu.Item>
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
            <HendelsesLogg
                refusjonId={refusjon.id}
                open={activeModal === 'hendelseslogg'}
                onClose={() => setActiveModal(null)}
            />
            {visHandlinger && (
                <ForlengFrist
                    refusjonId={refusjon.id}
                    eksisterendeFrist={refusjon.fristForGodkjenning}
                    senesteFrist={refusjon.senestMuligeGodkjenningsfrist}
                    open={activeModal === 'forlengFrist'}
                    onClose={() => setActiveModal(null)}
                />
            )}
            {visHandlinger && innloggetBruker.harKorreksjonTilgang && (
                <MerkForUnntakOmInntekterFremITid
                    refusjon={refusjon}
                    open={activeModal === 'inntekter'}
                    onClose={() => setActiveModal(null)}
                />
            )}
            {visKorreksjon && opprettKorreksjon && (
                <OpprettKorreksjonModal
                    opprettKorreksjon={opprettKorreksjon}
                    open={activeModal === 'korreksjon'}
                    onClose={() => setActiveModal(null)}
                />
            )}
        </Box>
    );
};

export default HandlingerMeny;
