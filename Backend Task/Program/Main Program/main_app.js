const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 3000;
const historyFilePath = 'C:/Users/Dell/Desktop/Placement/Kalvium/history.json';

let history = [];

function loadHistory() {
    if (fs.existsSync(historyFilePath)) {
        const historyData = fs.readFileSync(historyFilePath, 'utf-8');
        history = JSON.parse(historyData);
    }
}


loadHistory();


// Save history data to file
function saveHistory() {
    fs.writeFileSync('history.json', JSON.stringify(history), 'utf-8');
}

loadHistory(); // Load history when the server starts

const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment.trim() !== '');

    // Handle the shutdown request first
    if (req.url === '/shutdown' && req.method === 'GET') {
        // Save history before shutting down
        saveHistory();

        // Close the server gracefully
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Server is shutting down.');
        res.end();
        
        server.close(() => {
            console.log('Server is shutting down.');
            process.exit();
        });
        return;
    }
    if (pathSegments.length === 0) {
        // Examples
        res.write('<h1>Kalvium Onboarding Assessment</h1>');
        res.write('<h4>Below are few example operations you can perform, you can click it to view</h4>');
        res.write('<ul>');
        res.write('<li><a href="/history">/history</a></li>');
        res.write('<li><a href="shutdown">/shutdown</a></li>');
        res.write('<li><a href="/5/plus/3">/5/plus/3</a></li>');
        res.write('<li><a href="/3/minus/5">/3/minus/5</a></li>');
        res.write('<li><a href="/3/into/5/plus/8/into/6">/3/into/5/plus/8/multiply/6</a></li>');
        res.write('<li><a href="/10/plus/2/divide/4">/10/plus/2/divide/4</a></li>');
        res.write('</ul>');
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
            res.write('Please enter correct format');
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
        const expressionWithSymbols = expression
            .replace(/plus/g, '+')
            .replace(/minus/g, '−')
            .replace(/into/g, '×')
            .replace(/divide/g, '÷');
    
        const result = numbers[0];
        history.push({
            question: expressionWithSymbols,
            answer: result
        });
    
        // Limit history to 20 items
        if (history.length > 20) {
            history.shift();
        }
    
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const jsonResponse = JSON.stringify({ question: expressionWithSymbols, answer: result });
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


process.on('SIGINT', () => {
    saveHistory(); 
    process.exit();
});