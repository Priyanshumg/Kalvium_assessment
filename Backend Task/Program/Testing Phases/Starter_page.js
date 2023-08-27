const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment.trim() !== ''); // Split the path into segments and remove empty segments

    if (pathSegments.length === 0) {
        // Display custom examples of execution
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Math Expression Examples</h1>');
        res.write('<ul>');
        res.write('<li><a href="/3/into/5/plus/8/into/6">/3/into/5/plus/8/into/6</a></li>');
        res.write('<li><a href="/10/plus/2/divide/4">/10/plus/2/divide/4</a></li>');
        // Add more examples as needed
        res.write('</ul>');
        res.end();}
  
    if (pathSegments.length >= 3 && pathSegments.length % 2 === 1) {
        const operations = ['divide', 'into', 'plus', 'minus'];
        let numbers = [];
        let ops = [];

        for (const segment of pathSegments) {
            if (operations.includes(segment)) {
                ops.push(segment);
            } else {
                numbers.push(parseFloat(segment));
            }
        }

        if (numbers.length !== ops.length + 1) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.write('Invalid URL format');
            res.end();
            return;
        }

        while (ops.length > 0) {
            let index = ops.findIndex(op => op === 'into' || op === 'divide');
            if (index === -1) {
                index = 0;
            }

            const num1 = numbers[index];
            const num2 = numbers[index + 1];
            const operation = ops[index];

            numbers.splice(index, 2);
            ops.splice(index, 1);

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

            numbers.splice(index, 0, result);
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`Result: ${numbers[0]}`);
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
