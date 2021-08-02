const replaceTemplate = (temp, product) => {
    let out = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    out = out.replace(/{%IMAGE%}/g, product.image)
    out = out.replace(/{%PRICE%}/g, product.price)
    out = out.replace(/{%FROM%}/g, product.from)
    out = out.replace(/{%NUTRIENTS%}/g, product.nutrients)
    out = out.replace(/{%QUANTITY%}/g, product.quantity)
    out = out.replace(/{%DESCRIPTION%}/g, product.description)
    out = out.replace(/{%ID%}/g, product.id)

    if (!product.organic) out = out.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

    return out;
}

const getQueryJson = (reqUrl) => {
    reqUrl = reqUrl.split('?')
    reqUrl.shift()
    reqUrl = reqUrl.join('?')
    const params = new URLSearchParams(reqUrl);
    let paramObj = {};
    for (var value of params.keys()) {
        paramObj[value] = params.get(value);
    }
    return paramObj
}

module.exports = {
    replaceTemplate,
    getQueryJson,
};
