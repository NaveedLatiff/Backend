const http =require('http');
const fs=require('fs');
const server = http.createServer((req,res)=>{
    // console.log(req.url , req.method , req.headers);
    if(req.url==='/' || req.url==='/index.html'){
        res.setHeader('Content-Type', 'text/html');
        let html=fs.readFileSync('index.html');
        res.end(html);
    }else if(req.url==='/style.css'){
        res.setHeader('Content-Type', 'text/css');
        let css=fs.readFileSync('style.css');
        res.end(css);
    }else if(req.method=="POST" && req.url==="/submit-form"){
        let body="";
        req.on('data',chunk=>{
            body+=chunk.toString();
        });
        req.on('end',()=>{
            console.log("form data",body)
            const params=new URLSearchParams(body);
            const username=params.get('username');
            const email=params.get('email');
            res.setHeader('Content-Type','text/html') 
            res.write('<h1>Form Submitted...</h1>')
            res.write(`<p>Name:${username}</p>`);
            res.write(`<p>Email:${email}</p>`)
            res.end()
        });
    }
    else{
        res.setHeader('Content-Type','text/html');
        res.end('<h1>404 Page Not Found</h1>')
    }

    //It will stop the server 
    // process.exit();
})

const PORT=3000;
server.listen(PORT,()=>{
    console.log(`Server running on address http://localhost:${PORT}`)
})