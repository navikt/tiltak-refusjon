import * as React from 'react';
import BEMHelper from "../utils/bem";
import './RefusjonSide.less'
import FullforGodkjenning from "./FullforGodkjenning";
import Utregning from "./Utregning";
import restService from "../services/rest-service"
import {Refusjon, TiltaksType} from "../types/refusjon";
import RefusjonInit from "../types/refusjonInit";

const cls = BEMHelper('refusjonside');

const refusjon: Refusjon = RefusjonInit;

interface State {
    refusjon: Refusjon;
}

class RefusjonSide extends React.Component <{},State> {

    constructor(props: any) {
        super(props);
        this.state = {
            refusjon
        }
    }

    componentDidMount() {
        this.refusjonMedId("enId");
    }

    refusjonMedId = (id: String) => {
        return restService.hentRefusjon("enId")
            .then(promise => {
                console.log('tiltak: ', promise);
                this.setState({refusjon: promise});
            })
    };

    render() {
        return (
            <div className={cls.element('container')}>
                <FullforGodkjenning refusjon={this.state.refusjon}/>
                <Utregning refusjon={this.state.refusjon}/>
            </div>
        );
    }
}

export default RefusjonSide;

