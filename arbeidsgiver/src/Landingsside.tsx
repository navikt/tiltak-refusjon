import Success from '@/asset/image/Success.svg?react';
import SommerIkon from '@/asset/image/sommer.svg?react';
import { BodyShort, Button, Heading, Label, Link } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

import VerticalSpacer from '~/VerticalSpacer';
import Boks from '~/Boks';
import EksternLenke from '~/EksternLenke/EksternLenke';

const Landingsside: FunctionComponent = () => {
    const gåTilOversikten = () => {
        window.location.href = '/refusjon';
    };

    return (
        <Boks variant="hvit" style={{ margin: '2rem auto' }}>
            <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <SommerIkon />
                    <VerticalSpacer rem={1} />
                    <Heading size="large">Tiltaksrefusjon</Heading>
                    <VerticalSpacer rem={2} />
                </div>
                <BodyShort>
                    Dette er en løsning for å søke om refusjon for{' '}
                    <Link href={'https://www.nav.no/arbeidsgiver/midlertidig-lonnstilskudd'}>
                        midlertidig lønnstilskudd
                    </Link>{' '}
                    <Link href={'https://www.nav.no/arbeidsgiver/varig-lonnstilskudd'}> varig lønnstilskudd </Link>,{' '}
                    <Link href={'https://www.nav.no/arbeidsgiver/sommerjobb'}>sommerjobb</Link> og{' '}
                    <Link href={'https://www.nav.no/arbeidsgiver/varig-tilrettelagt-arbeid'}>
                        varig tilrettelagt arbeid i ordinær virksomhet.
                    </Link>{' '}
                </BodyShort>
                <VerticalSpacer rem={2} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="primary" onClick={gåTilOversikten}>
                        Gå til refusjonsoversikten
                    </Button>
                </div>
                <VerticalSpacer rem={2} />
                <div>
                    <Heading size="medium">Før dere søker må dere:</Heading>
                </div>
                <VerticalSpacer rem={2} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Success style={{ marginRight: '0.5rem' }} />
                        <Label>Ha rapportert inntekter til a-meldingen for perioden dere søker om refusjon.</Label>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <BodyShort size="small" style={{ marginLeft: '1.5rem' }}>
                        Dette gjøres som regel av de som jobber med lønn og regnskap i deres organisasjon.
                    </BodyShort>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Success style={{ marginRight: '0.5rem' }} />
                        <Label>
                            Ha bestemt(e) rolle(r) eller rettighet i deres virksomheten for å få tilgang til løsningen.
                        </Label>
                    </div>
                </div>
                <ul>
                    <li>
                        Dere må ha enkeltrettigheten inntektsmelding eller en av følgende Altinn-roller for å få tilgang
                        til løsningen:
                    </li>
                    <div style={{ marginLeft: '2rem' }}>
                        <li>ansvarlig revisor</li>
                        <li>lønn og personalmedarbeider</li>
                        <li>regnskapsfører lønn</li>
                        <li>regnskapsfører med signeringsrettighet</li>
                        <li>regnskapsfører uten signeringsrettighet</li>
                        <li>revisormedarbeider</li>
                        <li>norsk representant for utenlandsk enhet</li>
                    </div>
                </ul>
                <BodyShort size="small">
                    Les mer om{' '}
                    <EksternLenke href="https://info.altinn.no/hjelp/profil/enkelttjenester-og-roller/">
                        roller og rettigheter i Altinn
                    </EksternLenke>
                </BodyShort>
            </div>
        </Boks>
    );
};

export default Landingsside;
