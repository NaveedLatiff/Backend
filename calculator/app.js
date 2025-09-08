const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home') {
        res.setHeader('Content-Type', 'text/html');
        const html = fs.readFileSync('index.html');
        return res.end(html)
    } else if (req.url === '/calculator') {
        res.setHeader("Content-Type", 'text/html');
        res.write("<form action='/calculatorResult' method='POST'>  ")
        res.write("<input type='number' name='num1' placeholder='Enter First Number'>");
        res.write("<input type='number' name='num2' placeholder='Enter Second Number'>");
        res.write("<button>Add</button>")
        res.write("</form>")
        return res.end();
    } else if (req.method == "POST" && req.url === '/calculatorResult') {
        let body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log("form data", body)
            const params=new URLSearchParams(body);
            const num1=params.get('num1');
            const num2=params.get('num2');
            res.setHeader("Content-Type", "text/html");
            res.write(`The Addition is ${Number(num1 || 0)+Number(num2 || 0)}`);
            return res.end();
        });
        return;
    };
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>PAGE NOT FOUND</h1>");
    res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});