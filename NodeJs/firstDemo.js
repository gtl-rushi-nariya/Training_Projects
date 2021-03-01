var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('rushi here\n');

    var dateObj = new Date();
    console.log(dateObj.getDate());
    res.end('Hello World!');
}).listen(8081);