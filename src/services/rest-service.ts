import {Refusjon} from "../types/refusjon";

const API_URL = 'http://localhost:8070/tiltak-refusjon-api/refusjon?id=enId';


export interface RestService {
    hentRefusjon: (id: string) => Promise<Refusjon>;
}

const hentRefusjon = async (id: String): Promise<Refusjon> => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    //headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');

    console.log('url: ', API_URL);

    return await fetch(API_URL, {
        //mode: 'no-cors',
        //credentials: 'include',
        method: 'GET',
        headers: headers
    }).then(response => {
        if (!response.ok) {
            console.error('error: ', response);
            throw new Error(response.statusText)
        }
        return response.json() as Promise<Refusjon>
    }).catch(error => {
            console.error('error2: ', error);
        throw error}
        )
};

const restService: RestService = {
    hentRefusjon
};

export default restService;