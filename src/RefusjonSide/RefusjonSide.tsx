import * as React from 'react';
import BEMHelper from "../utils/bem";
import './RefusjonSide.less'
import FullforGodkjenning from "./FullforGodkjenning";
import Utregning from "./Utregning";
import restService from "../services/rest-service"
import {Refusjon} from "../types/refusjon";
import refusjonMock from "../services/__mocks__/refusjon-mock";

const cls = BEMHelper('refusjonside');

class RefusjonSide extends React.Component {

    render() {
        const refusjon: Promise<Refusjon> = refusjonMedId("enId");
        //console.log('Refusjon: ', refusjon);
        const refusjon2 = refusjonMock;

        return (
            <div className={cls.element('container')}>
                <FullforGodkjenning refusjon={refusjon2}/>
                <Utregning refusjon={refusjon2}/>
            </div>
        );
    }
}

function refusjonMedId(id: String): Promise<Refusjon> {
     return restService.hentRefusjon("enId")
        .then(promise => {
             console.log('tiltak: ', promise.tiltakstype);
             return promise;
        })
}

function promiseTilRefusjon(promise:Refusjon): Refusjon {
    const refusjon: Refusjon = {
        id: promise.id,
        tiltakstype: promise.tiltakstype,
        fraDato: new Date(2020, 4, 1),
        tilDato: new Date(2020, 6, 30),
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
        refusjonsBelop: 13579
    };
        return refusjon;
}


export default RefusjonSide;

