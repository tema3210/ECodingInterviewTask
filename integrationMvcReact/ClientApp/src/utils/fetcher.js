
export default async ([k,query,opts]) => {
    return await (await fetch(appendQueryParams(k, query), opts)).json()
};

function appendQueryParams(query, params) { //qparams builder
    let acc = "?";

    for (const [k, v] of Object.entries(params)) {
        if (v === null) continue;
        if (Array.isArray(v)) { //support for multi value query params, not all frameworks support this tho
            v.forEach((vp) => acc += `${k}=${vp.toString()}&`); 
        } else {
            acc += `${k}=${v.toString() }&`;
        }
    }
    return query + acc;
}