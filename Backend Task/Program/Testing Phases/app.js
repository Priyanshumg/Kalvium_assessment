const http = require('http');
const calculator = require('./calculator'); // Make sure the path is correct
const port = 3000;

const server = http.createServer(calculator);

server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
