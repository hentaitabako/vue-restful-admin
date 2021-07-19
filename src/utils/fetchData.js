export default async (url, method = 'GET', data = {}, header = {}) => {
    const option = {
        method,
        headers: { 'Content-Type': 'application/json', ...header },
    };
    console.log(method, 'method');
    if (method !== 'GET' && method !== 'get') {
        console.log('lolo');
        option.body = JSON.stringify(data);
    } else {
        let s = '';
        for (const key of Object.keys(data)) {
            s = s + `${key}=${data[key]}&`;
        }
        url = url + '?' + s;
    }
    console.log(option);
    const res = await fetch(url, option);
    const json = await res.json();
    console.log(json, 'json');
    return json;
};
