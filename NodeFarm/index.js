const fs = require('fs')
const http = require('http')
const url = require('url')
const { replaceTemplate, getQueryJson } = require('./modules')

///////////////////////////////////////
// SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const port = 8000
const host = "127.0.0.1"



const server = http.createServer((req, res) => {

    const query = getQueryJson(req.url);
    const pathname = req.url.split('?')[0]

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output)

    // Product page
    } else if (pathname === '/product') {
        const product = dataObj[query.id]
        res.writeHead(200, { 'Content-type': 'text/html' })
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

    // API
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(data)

    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('<h1>Page could not be found!\nerror 404</h1>')
    }
})

server.listen(port, host, () => {
    console.log(`Listening to server at ${host}:${port}`);
})