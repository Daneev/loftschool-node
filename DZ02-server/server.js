const http = require('http');
const program = require('commander');

program
    .version('1.1.0')
    .option('-port, --port [type]', 'Change port [output]', 3000)
    .option('-int, --int [type]', 'Interval time to response (ms) [output]', 500)
    .option('-end, --end [type]', 'Time to end server (ms) [output]', 2000)
    .parse(process.argv);

const port = program.port;
const interval = program.int;
const end = program.end;
const hostname = "127.0.0.1";

const server = http.createServer((request,response) => {
    if (request.url === '/time') {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello!\n`);
    watches()
        .then(date => response.write(`Done! ${date}\n`))
        .then(() => {
            response.end(`Everything is cleanly shutdown`);
        })
    }
    else {
        response.statusCode = 200;
        response.end('This is main page? go to /time');
    };
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const watches = () => {
    return new Promise((resolve, reject) => {
        const timerId = setInterval(() => {
            console.log(new Date());
        }, interval);
        setTimeout(() => {
            clearInterval(timerId);
            resolve(new Date());
        }, end);
    });
};

// watches().then(date => console.log(`Done! ${date}`));