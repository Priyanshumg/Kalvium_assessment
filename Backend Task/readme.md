# Backend Assessment
Hello Hiring team!!, This is Priyanshu Ginkal, here is the  backend assessment for onboarding process.

## Requirements to accomplish 
So for this project we need to have knowledge regarding the following given below 
* Java Script(js)
* Node.js
* Server - Client Communication

## Installation 

So here we will install axios for HTTP client for the browser and node.js, to install this we will require npm package manager, It comes pre installed with node.js windows installation. If other opereating systems such as Linux or Mac we can use the following comands for the basic installation

#### For Mac
```bash
brew install node
```

#### For Linux
```
sudo apt update  # For Ubuntu/Debian
sudo apt install nodejs npm

```

```bash
npm install axios
```

#### Axios Installation
Once we are done with installing npm we can use the following command to install it in the enviorment.

```bash
npm install axios
```


## Code Explained
This part 
#### Importing Modules

In this part of code we are importing modules required for the project
* http modules is required for creating an HTTP server
* url for parsing URL
* fs for working with file systems
* axios for the code to upload a meta data in github 

``` bash
const http = require('http');
const url = require('url');
const fs = require('fs');
const axios = require('axios');
```

#### Server Configuration
This part of code is for the port number on which the server would listen to the incoming HTTP request made by the localhost. About port 3000, It is used for developing and testing Web-Application before they are been released. 

``` bash
const port = 3000;
```

#### History Array
This is array to store history of past 20 operations made on server.

``` bash
const history = [];
```

#### GitHub Access Token and Repository Information
These Variable introduced hold the information of Github access tokens, Repository owner and the name of the Repository.

``` bash
const githubAccessToken = 'Enter your github access token ';
const repoOwner = 'Enter Repository owner username';
const repoName = 'Enter the repository name';
```

#### Creating the HTTP Server
Http server is created by this part of code `http.createServer()`. This function takes a callback that handles incoming request and generates responses. 
``` bash
const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment.trim() !== '');
```

#### Handling Requests
Inside the callback funcion, we are dealing with different types of requests such as
* Displaying Examples
``` 
http://localhost:3000/
```
* Performing Calculations
``` 
http://localhost:3000/2/plus/3
```
* Retrieving History
``` 
http://localhost:3000/history
```
* Invalid Requests - Server responds the format is invalid
```
http://localhost:3000/2+3=?
```

#### Listening to Requests 
``` bash
server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
```




## Functionalities
So we use different operative functionality such as

* home (/)
```
http://localhost:3000/
```

* history (/history)
```
http://localhost:3000/history
```


* Addition (/Plus)
```
http://localhost:3000/2/plus/3
```

* Subtration (/Minus)
```
http://localhost:3000/2/minus/3
```

* Multiplication (/into)
```
http://localhost:3000/2/into/3
```

* Division (/divide)
```
http://localhost:3000/2/divide/3
```
We can use multiple variable to perform all this operations.\
`note:- The functions are case sensitive`


## Main Program
First, Let's start with the basic functionality of program, the home page, here when type `http://localhost:3000/` in url, it should show some examples on how the operation works. The examples provided in the test cases from the assessment are used here.
```
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
```

This part of code performs calculations (core Web-application)

```
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
```
and finally this part helps in retrieving History of the operation made
```
      // Limit history to 30 items
        if (history.length > 30) {
            history.shift();
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        const jsonResponse = JSON.stringify({ question: expression, answer: result });
        res.write(jsonResponse);
        res.end();
else if (parsedUrl.pathname === '/history') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const historyJSON = history.map(entry => ({
        question: entry.question,
        answer: entry.answer
    }));
    const jsonResponse = JSON.stringify(historyJSON, null, 2);
    res.write(jsonResponse);
    res.end();
}
```


## Bugs
So on my process of completing this project, I faced many bugs and errors which I researched on and fixed it, here are few that bugs

* Bug 1:
        Subtraction Operation, In this bug when we subtract a number say our first variable is 2 and second variable is 3, so the URL should be `http://localhost:3000/2/minus/3` here we faced an issue that the web-app couldn't subtract as the first variable is smaller than the second variable, so to fix this what I did is I declared some rules orders to the program by using `BODMAS/BIDMAS` rule

* Bug 2: So while implementing multiple variable operation, I faced an issue in the 4th example which was `http://localhost:3000/2/minus/3/3/into/5/plus/8/into/6`, Here the issue was when i was performing this operation the solution which was printed during the was the wronge one `138` while the ans should be `63`. It was because the program evaluates multiplication and division regardless the order of operation. So to solve this issue I added some new rules to the `BODMAS/BIDMAS` rule by introducing some new rules and a bit of modification we resolved the issue.
