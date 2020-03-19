import {Refusjon} from "./refusjon";
import {Varighet} from "./refusjon";

const varighetInit: Varighet = {
    fraDato: "",
    tilDato: "",
    maaneder: 0,
    dager: 0
};

const refusjonInit: Refusjon = {
    id: "",
    tiltakstype: 'Arbeidstrening',
    deltakerNavn: "",
    veilederNavn: "",
    bedriftNavn: "",
    bedriftKontaktperson: "",
    feriedager: 0,
    trekkFeriedager: 0,
    sykepenger: 0,
    sykedager: 0,
    stillingsprosent: 0,
    manedslonn: 0,
    nettoManedslonn: 0,
    satsFeriepenger: 0,
    feriepenger: 0,
    satsOtp: 0,
    otpBelop: 0,
    satsArbgiverAvgift: 0,
    arbgiverAvgift: 0,
    totalArbgiverUtgift: 0,
    refusjonsProsent: 0,
    refusjonsBelop: 0,
    varighet: varighetInit,
};

export default refusjonInit