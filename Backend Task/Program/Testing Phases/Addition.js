// Pre-requisites
const http = require('http');
const url = require('url'); // Import the 'url' module

const port = 3000;

// Server App
const server = http.createServer(function(req, res) {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);

    // Get the query parameters
    const query = parsedUrl.query;
    const num1 = parseFloat(query.num1);
    const num2 = parseFloat(query.num2);

    // Check if both inputs are valid numbers
    if (!isNaN(num1) && !isNaN(num2)) {
        // Perform the addition
        const result = num1 + num2;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`Result: ${result}`);
        res.end();
    } else {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.write('Invalid inputs');
        res.end();
    }
});

// Listener to Server
server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
