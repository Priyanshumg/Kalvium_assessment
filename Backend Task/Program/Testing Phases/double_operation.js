const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathSegments = parsedUrl.pathname.split('/'); // Split the path into segments

    if (pathSegments.length === 4 && pathSegments[2] && pathSegments[3]) {
        const num1 = parseFloat(pathSegments[1]);
        const num2 = parseFloat(pathSegments[3]);
        const operation = pathSegments[2].toLowerCase();

        let result;

        switch (operation) {
            case 'plus':
                result = num1 + num2;
                break;
            case 'minus':
                result = num1 - num2;
                break;
            case 'into':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    res.write('Division by zero is not allowed');
                    res.end();
                    return;
                }
                break;
            default:
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.write('Invalid operation');
                res.end();
                return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`Result: ${result}`);
        res.end();
    } else {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.write('Invalid URL format');
        res.end();
    }
});

server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
