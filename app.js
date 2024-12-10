const http = require('http');
const fs = require('fs');
const path = require('path')

const PORT = 3000;

const server = http.createServer((req, res) => {
    let paths = path.join(__dirname, '/views/');
    if (req.url.startsWith('/node_modules/')) {        
        paths = path.join(__dirname, req.url);         
    } else if(req.url.startsWith('/public/')) {
        paths = path.join(__dirname, req.url);        
    } else {
        paths += req.url == '/' ? 'index.html' : 
                 req.url == '/about' ? 'about.html' :
                 req.url == '/contact' ? 'contact.html' :
                 req.url == '/service' ? 'service.html' : '404.html' 
    }
    // let extname = path.extname(paths);
    // let
    
    fs.readFile(paths, (err, data) => {
        if(err){
            console.log(`Something went wrong: `,err);
            res.end();
            return
        }
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.end(data);
    })
});

server.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
})
