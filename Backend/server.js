var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer((res, req) => {
    console.log("Start Server");
    
    var filePath = '.' + req.url;
    if (filePath == './')
        filePath = './index.html';
        
    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    }
    
    contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) =>{
        if(err){
            if(err.code == 'ENOENT'){
                fs.readFile('./404.html', (err, content) => {
                    res.writeHead(200, { 'Content-Type': contentType});
                    res.end(content, 'utf-8');
                });
            }
            else{
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + err.code+' ..\n')
                res.end();
            }
        }
        res.writeHead(200, { 'Content-Type': contentType});
        res.end(content, 'utf-8');
        
    });
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081');