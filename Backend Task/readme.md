# Backend Assessment
Hello Hiring team!!, This is Priyanshu Ginkal, here is the  backend assessment for the onboarding process.

## Requirements to accomplish 
So for this project, we need to have knowledge regarding the following given below 
* JavaScript(js)
* Node.js
* Server - Client Communication

## Installation 

So here we will install axios for the HTTP client for the browser and node.js, to install this we will require npm package manager, It comes pre-installed with node.js Windows installation. If other operating systems such as Linux or Mac we can use the following commands for the basic installation

#### For Mac
```bash
brew install node
```

#### For Linux
```
sudo apt update  # For Ubuntu/Debian
sudo apt install nodejs npm
```

#### Axios Installation
Once we are done with installing npm we can use the following command to install it in the environment.
```bash
npm install axios
```
![Installation](https://github.com/Priyanshumg/Kalvium_assessment/blob/72120b4a5cc49ee70a1ab67528a3d57842f8c7dd/Backend%20Task/Images/Installation%20Screenshot.png)


## Code Explained
#### Importing Modules

In this part of the code, we are importing modules required for the project
* HTTP modules is required for creating an HTTP server
* URL for parsing URL
* fs for working with file systems
* Axios for the code to upload metadata in GitHub 

``` 
const http = require('http');
const url = require('url');
const fs = require('fs');
const axios = require('axios');
```



#### Server Configuration
This part of the code is for the port number on which the server would listen to the incoming HTTP request made by the localhost. About port 3000, It is used for developing and testing Applications before they are been released. 

``` 
const port = 3000;
```

#### History Array
This is an array to store the history of the past 20 operations made on the server.

``` 
const history = [];
```

#### GitHub Access Token and Repository Information
These Variables introduced hold the information of GitHub access tokens, the Repository owner and the name of the Repository.

``` bash
const githubAccessToken = 'Enter your github access token ';
const repoOwner = 'Enter Repository owner username';
const repoName = 'Enter the repository name';
```

#### Creating the HTTP Server
HTTP server is created by this part of code `http.createServer()`. This function takes a callback that handles incoming requests and generates responses. 
``` bash
const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment.trim() !== '');
```

#### Handling Requests
Inside the callback function, we are dealing with different types of requests such as
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
* Invalid Requests - The server responds the format is invalid
```
http://localhost:3000/2+3=?
```

#### Listening to Requests 
``` 
server.listen(port, function(error) {
    if (error) {
        console.log('\Error!!', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
```




## Functionalities
So we use different operative functionalities such as

* home (/)
``` bash
http://localhost:3000/
```
![Home](https://github.com/Priyanshumg/Kalvium_assessment/blob/72120b4a5cc49ee70a1ab67528a3d57842f8c7dd/Backend%20Task/Images/Functionality%201(home).png)

* History (/history)
``` bash
http://localhost:3000/history
```
![History](https://github.com/Priyanshumg/Kalvium_assessment/blob/72120b4a5cc49ee70a1ab67528a3d57842f8c7dd/Backend%20Task/Images/functionality%202(history).png)

* Addition (/Plus)
``` bash
http://localhost:3000/2/plus/3
```
![Addition](https://github.com/Priyanshumg/Kalvium_assessment/blob/72120b4a5cc49ee70a1ab67528a3d57842f8c7dd/Backend%20Task/Images/functionality%203%20(Add).png)
* Subtraction (/Minus)
``` bash
http://localhost:3000/2/minus/3
```
![Subtraction](https://github.com/Priyanshumg/Kalvium_assessment/blob/72120b4a5cc49ee70a1ab67528a3d57842f8c7dd/Backend%20Task/Images/Functionality%204%20(subtract).png)
* Multiplication (/into)
``` bash
http://localhost:3000/2/into/3
```
![Multiplication](https://github.com/Priyanshumg/Kalvium_assessment/blob/72120b4a5cc49ee70a1ab67528a3d57842f8c7dd/Backend%20Task/Images/Functionality%205%20(multiply).png)

* Division (/divide)
```bash
http://localhost:3000/2/divide/3
```
![divide](https://github.com/Priyanshumg/Kalvium_assessment/blob/72120b4a5cc49ee70a1ab67528a3d57842f8c7dd/Backend%20Task/Images/Functionality%206%20(divide).png)

* Server Shutdwon (/shutdown)
```bash
http://localhost:3000/shutdown
```
![shutdown](https://github.com/Priyanshumg/Kalvium_assessment/blob/54327b4b4917fbb52471026bf76c3332bb0d8717/Backend%20Task/Images/Functionality%207%20(shutdown).png)

We can use multiple variables to perform all these operations.\
`note:- The functions are case sensitive`


## Main Program
First, Let's start with the basic functionality of the program, the home page, here when type `http://localhost:3000/` in URL, it should show some examples of how the operation works. The examples provided in the test cases from the assessment are used here.
```
    if (pathSegments.length === 0) {
        // This Displays examples that were provided in the task assessment
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Math Expression Examples</h1>');
        res.write('<ul>');
        res.write('<li><a href="/3/into/5/plus/8/into/6">/3/into/5/plus/8/into/6</a></li>');
        res.write('<li><a href="/10/plus/2/divide/4">/10/plus/2/divide/4</a></li>');
        res.write('</ul>');
        res.end();
    }
```

This part of the code performs calculations (core Web-application)

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
finally, this part helps in retrieving the History of the operation made
```
      // Limit history to 20 items
        if (history.length > 20) {
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


## Bugs (fixed)
So in my process of completing this project, I faced many bugs and errors which I researched and fixed, Here are a few bugs

* Bug 1:
        Subtraction Operation, In this bug when we subtract a number say our first variable is 2 and the second variable is 3`(tried with 2/minus/2 still the output was 2)`, so the URL should be `http://localhost:3000/2/minus/3` here we faced an issue that the web app couldn't subtract as the first variable is smaller than the second variable, so to fix this what I did is I declared some rules orders to the program by using `BODMAS/BIDMAS` rule

![BUG 1](https://github.com/Priyanshumg/Kalvium_assessment/blob/45ae0d3d0dd577a1e63832eff920a441ce99cc35/Backend%20Task/Images/Bug%201.png)


* Bug 2: So while implementing multiple variable operations, I faced an issue in the 4th example which was `http://localhost:3000/2/minus/3/3/into/5/plus/8/into/6`, Here the issue was when I was performing this operation the solution which was printed during the was the wrong one `138` while the ans should be `63`. It was because the program evaluates multiplication and division regardless of the order of operation. So to solve this issue I added some new rules to the `BODMAS/BIDMAS` rule by introducing some new rules and a bit of modification we resolved the issue.
![bug 2](https://github.com/Priyanshumg/Kalvium_assessment/blob/45ae0d3d0dd577a1e63832eff920a441ce99cc35/Backend%20Task/Images/Bug%202.png)

