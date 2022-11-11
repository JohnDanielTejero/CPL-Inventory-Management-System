import { getCookie } from "../constants";

/**
 * Abstract class for api calls.
 *
 * In which all fetch calls are uniformed.
 */
abstract class ApiEndpoint{

    readonly endpoint:string;
    readonly baseEndpoint:string = "http://localhost:8000/api";

    /**
     *
     * @param options { url : 'url', method:'METHOD', body: 'data'}
     * @param contentType Defaults to application/json, can be changed if left as not null
     * @returns Object response
     */
    request = async (options:any, contentType?:string) => {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
        })

        if(getCookie("ACCESS_TOKEN")) {
            headers.append('Authorization', 'Bearer ' + getCookie("ACCESS_TOKEN"))
        }

        if (contentType){
            headers.set('Content-Type', contentType);
        }

        const defaults = {headers: headers};
        options = Object.assign({}, defaults, options);

        return await fetch(options.url, options)
            .then(response =>
                response.json().then(json => {
                    return json;
                })
        );
    }
}

export default ApiEndpoint;
