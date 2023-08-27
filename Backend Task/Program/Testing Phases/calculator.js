const http = require('http');
const url = require('url');
const fs = require('fs');
const axios = require('axios');

const port = 3000;

const history = []; // Array to store history of operations

const githubAccessToken = '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'; // Replace with your GitHub access token
const repoOwner = 'Priyanshumg'; // Replace with your GitHub repository owner
const repoName = 'Kalvium_assessment'; // Replace with your GitHub repository name


const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment.trim() !== '');

    if (pathSegments.length === 0) {
        // Display custom examples of execution
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Math Expression Examples</h1>');
        res.write('<ul>');
        res.write('<li><a href="/3/into/5/plus/8/into/6">/3/into/5/plus/8/into/6</a></li>');
        res.write('<li><a href="/10/plus/2/divide/4">/10/plus/2/divide/4</a></li>');
        // Add more examples as needed
        res.write('</ul>');
        res.end();
    }
    else if (pathSegments.length >= 3 && pathSegments.length % 2 === 1) {
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

        const expression = pathSegments.join(' ');
        const result = numbers[0];
        history.push({
            question: expression,
            answer: result
        });

        // Limit history to 30 items
        if (history.length > 30) {
            history.shift();
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        const jsonResponse = JSON.stringify({ question: expression, answer: result });
        res.write(jsonResponse);
        res.end();
    } else if (parsedUrl.pathname === '/history') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const historyJSON = history.map(entry => ({
            question: entry.question,
            answer: entry.answer
        }));
        const jsonResponse = JSON.stringify(historyJSON, null, 2);
        res.write(jsonResponse);
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
