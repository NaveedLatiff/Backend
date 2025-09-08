const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === "/" || req.url === '/home') {
        res.setHeader("Content-Type", "text/html");
        // readFile is asynchronous and readFileSync is synchronous
        fs.readFile("index.html",(err,data)=>{
            if(err){
                // It take status and headerObj
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end('Server Error');
            }
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        });
        return
    } else if (req.url === "/about") {
        res.setHeader("Content-Type", "text/html");
        res.write("<h1>This Is About Page</h1>");
        return res.end()
    } 
    else if (req.url === "/contact") {
        res.setHeader("Content-Type", "text/html");
        res.write("<h1>This Is Contact Page</h1>");
        return res.end()
    }
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Page Not Found</h1>");
    res.end()

});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});