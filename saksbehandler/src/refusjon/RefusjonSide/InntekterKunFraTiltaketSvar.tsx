import { FunctionComponent } from "react";


const InntekterKunFraTiltaketSvar  : FunctionComponent<{inntekterKunFraTiltaket : boolean | undefined}> = ({inntekterKunFraTiltaket}) => {
    const svar = () => {
        switch (inntekterKunFraTiltaket) {
            case true:
                return 'Ja';
            case false:
                return 'Nei';
            default:
                return 'Ikke besvart';
        }
    };

    return  (
        <p>{svar()}</p>
    )
}
export default InntekterKunFraTiltaketSvar;