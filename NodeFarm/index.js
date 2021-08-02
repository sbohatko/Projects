const fs = require('fs')
const http = require('http')
const url = require('url')

///////////////////////////////////////
// SERVER

const replaceTemplate = (temp, product) => {
    let out = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    out = out.replace(/{%IMAGE%}/g, product.image)
    out = out.replace(/{%PRICE%}/g, product.price)
    out = out.replace(/{%FROM%}/g, product.from)
    out = out.replace(/{%NUTRIENTS%}/g, product.nutrients)
    out = out.replace(/{%QUANTITY%}/g, product.quantity)
    out = out.replace(/{%ID%}/g, product.id)

    if (!product.organic) out = out.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

    return out;
}
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)



const server = http.createServer((req, res) => {
    const pathname = req.url

    //Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)        
        res.end(output)

        //Product page
    } else if (pathname === '/product') {
        res.end('This is PRODUCT')

        //API
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(data)

        //Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('<h1>Page could not be found!\nerror 404</h1>')
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("listen to server");
})