export const base = 'http://localhost:8000';

export const request = async (options:any, contentType?:string) => {

    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem("ACCESS_TOKEN")) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("ACCESS_TOKEN"))
    }

    if (contentType){
        headers.set('Content-Type', contentType);
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return await fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
    );
}

