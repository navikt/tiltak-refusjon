import {Refusjon} from '../../types/refusjon';

const refusjonMock: Refusjon = {
    id: 'c9697a6f-f3fe-4436-a9d9-959ab6e5bcbe',
    tiltakstype: "Midlertidig lønnstilskudd",
    deltakerNavn: 'Mikke Mus',
    veilederNavn: 'Jonas Trane',
    bedriftNavn: 'Kiwi Majorstuen',
    bedriftKontaktperson: 'Martine Loren',
    feriedager: 2,
    trekkFeriedager: 1500,
    sykedager: 2,
    sykepenger: 2000,
    stillingsprosent: 100,
    manedslonn: 30000,
    nettoManedslonn: 26500,
    satsOtp: 0.02,
    otpBelop: 530,
    satsFeriepenger: 0.12,
    feriepenger: 3180,
    satsArbgiverAvgift: 0.141,
    arbgiverAvgift: 3737,
    totalArbgiverUtgift: 33947,
    refusjonsProsent: 40,
    refusjonsBelop: 13579,
    varighet: {fraDato: "01.03.2020", tilDato: "06.06.2020", dager: 6, maaneder: 3}
};


export default refusjonMock;
