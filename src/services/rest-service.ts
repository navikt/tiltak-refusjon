import {Refusjon} from "../types/refusjon";

const API_URL = 'http://localhost:8070/tiltak-refusjon-api/refusjon';
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};


export interface RestService {
    hentRefusjon: (id: string) => Promise<Refusjon>;
    lagreRefusjon: (refusjon: Refusjon) => Promise<Refusjon>;
}

const hentRefusjon = async (id: String): Promise<Refusjon> => {

    console.log('url: ', API_URL);

    return await fetch(API_URL + '?id=' + `${id}`, {
        //mode: 'no-cors',
        //credentials: 'include',
        method: 'GET',
        headers: HEADERS
    }).then(response => {
        if (!response.ok) {
            console.error('error: ', response);
            throw new Error(response.statusText)
        }
        return response.json() as Promise<Refusjon>
    }).catch(error => {
            console.error('error2: ', error);
            throw error
        }
    )
};

const lagreRefusjon = async (refusjon: Refusjon): Promise<Refusjon> => {

    console.log('url: ', API_URL);
    console.log('Refusjon: ', refusjon);

    // if (avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver || avtale.godkjentAvVeileder) { //TODO Sjekke på godkjenning

    const response = await fetch(API_URL, {
        method: 'PUT',
        body: JSON.stringify(refusjon),
        headers: HEADERS
    });

    return await hentRefusjon(refusjon.id);
};

const restService: RestService = {
    hentRefusjon,
    lagreRefusjon,
};
export default restService;