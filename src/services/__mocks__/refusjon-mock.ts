import { Refusjon } from "../../types/refusjon";

const refusjonMock: Refusjon = {
  id: "c9697a6f-f3fe-4436-a9d9-959ab6e5bcbe",
  tiltak: "Midlertidig lønnstilskudd",
  deltaker: "Mikke Mus",
  deltakerFnr: "07098142678",
  veileder: "Jonas Trane",
  bedrift: "Kiwi Majorstuen",
  bedriftnummer: "998877665",
  bedriftKontaktperson: "Martine Loren",
  feriedager: 2,
  trekkFeriedagerBeløp: 1500,
  sykedager: 2,
  sykepenger: 2000,
  stillingsprosent: 100,
  månedslønn: 30000,
  nettoMånedslønn: 26500,
  satsOtp: 0.02,
  beløpOtp: 530,
  satsFeriepenger: 0.12,
  feriepenger: 3180,
  satsArbeidsgiveravgift: 0.141,
  arbeidsgiveravgift: 3737,
  sumUtgifterArbeidsgiver: 33947,
  satsRefusjon: 40,
  refusjonPrMåned: 13579,
  fraDato: "01.03.2020",
  tilDato: "06.06.2020",
};

export default refusjonMock;
