import * as React from 'react';
import BEMHelper from "../utils/bem";
import './RefusjonSide.less'
import FullforGodkjenningArbeidsgiver from "./FullforGodkjenningArbeidsgiver";
import FullforGodkjenningSaksbehandler from "./FullforGodkjenningSaksbehandler";
import Utregning from "./utregning/Utregning";
import restService from "../services/rest-service"
import {Refusjon} from "../types/refusjon";
import RefusjonInit from "../types/refusjonInit";

const cls = BEMHelper('refusjonside');

const refusjon: Refusjon = RefusjonInit;

interface State {
    refusjon: Refusjon;
}

const saksbehandler = false;

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
            .then((promise: Refusjon) => {
                console.log('tiltak: ', promise);
                this.setState({refusjon: promise});
            })
    };

    godkjenningComponent = () => {
        if(saksbehandler){
            return <FullforGodkjenningSaksbehandler refusjon={this.state.refusjon}/>
        }
        return <FullforGodkjenningArbeidsgiver refusjon={this.state.refusjon}/>
    }

    render() {
        return (
            <div className={cls.element('container')}>
                {this.godkjenningComponent()}
                <Utregning refusjon={this.state.refusjon}/>
            </div>
        );
    }
}

export default RefusjonSide;

