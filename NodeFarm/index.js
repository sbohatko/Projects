const fs = require('fs') 
const http = require('http')
const { dirname } = require('path/posix')
const url = require('url')


///////////////////////////////////////
// FILES

//block
// const text = fs.readFileSync('./txt/input.txt','utf-8')
// console.log(text);

// const txtOut = `This is what we know about avocado: ${text}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt',txtOut)
// console.log("File Written!");

//nonblock
// fs.readFile('./txt/start.txt','utf-8', (err,data1)=>{
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8', (err,data3)=>{
//             console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('File has been written !!');
//             })
//         })
//     })
// })
// console.log('Will read file!');

///////////////////////////////////////
// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)


const server = http.createServer((req, res)=>{
    const pathname = req.url
    if(pathname === '/' || pathname === '/overview'){
        res.end("This is OVERVIEW")
    }else if(pathname === '/product'){
        res.end('This is PRODUCT')
    }else if (pathname === '/api'){
        res.writeHead(200, {'Content-type':'application/json'})
        res.end(data)
        }else{
        res.writeHead(404, {
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        })
        res.end('<h1>Page could not be found!\nerror 404</h1>')
    }
})

server.listen(8000,"127.0.0.1", ()=>{
    console.log("listen to server");
})