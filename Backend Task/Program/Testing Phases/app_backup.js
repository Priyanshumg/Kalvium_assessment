// Pre-requistics
const http = require('http')
const port = 3000

// Server App
const server = http.createServer(function(req,res) {
    res.write('Hello Node')
    res.end()
})

// Listener to Server
server.listen(port, function(error) {
    if (error){
        console.log('Something went wrong', error)
    }
    else {
        console.log('Server is listening on port ' + port)
    }
})


//  new code

const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment.trim() !== ''); // Split the path into segments and remove empty segments

    if (pathSegments.length >= 3 && pathSegments.length % 2 === 1) {
        let operations = ['divide', 'into', 'plus', 'minus'];
        let result = parseFloat(pathSegments[0]);
        let currentOperation = null;

        for (let i = 1; i < pathSegments.length; i++) {
            const segment = pathSegments[i];

            if (operations.includes(segment)) {
                currentOperation = segment;
            } else {
                const num = parseFloat(segment);

                if (isNaN(num)) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    res.write('Invalid number in URL');
                    res.end();
                    return;
                }

                switch (currentOperation) {
                    case 'plus':
                        result += num;
                        break;
                    case 'minus':
                        result -= num;
                        break;
                    case 'into':
                        result *= num;
                        break;
                    case 'divide':
                        if (num !== 0) {
                            result /= num;
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/html' });
                            res.write('Division by zero is not allowed');
                            res.end();
                            return;
                        }
                        break;
                    default:
                        // If no operation has been set, use addition by default
                        result += num;
                        break;
                }

                // Reset the current operation
                currentOperation = null;
            }
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
