export const formToObject = function (data: FormData) {
    let object: any = {};
    data.forEach(function (value, key) {
        if (value === 'undefined') {
            object[key] = undefined;
        } else if (typeof value === 'string' && value.length < 1) {
            object[key] = null
        }
        else if (value === 'null') {
            object[key] = null;
        } else {
            object[key] = value;
        }
    });

    return object;
}


export const objectToForm = function (object: { [key: string]: any }) {
    const formData = new FormData();
    for (let key in object) {
        formData.append(key, object[key]);
    }

    return formData;
}