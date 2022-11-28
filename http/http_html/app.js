// import http module 
const http = require( 'http' );
// import the file system module
const fs = require( 'fs' );

// create a port
const port = 9999;

// first option
// create a server with the instance of the http module generated
const server = http.createServer( (req, res) => {
    res.writeHead( 200, { 'Content-Type': 'text/html' } );
    fs.readFile('../boy.html', (err, data) => {
        if ( err ) {
            console.log("There was an error trying to read the file.")
        } else {
            res.end(data);
        }
    });
} );


// second option
// const theFile = (req, res) => {
//     res.writeHead( 200, { 'Content-Type': 'text/html' } );
//     fs.readFile('../boy.html', (err, data) => {
//         if ( err ) {
//             console.log("There was an error trying to read the file.")
//         } else {
//             res.end(data);
//         }
//     });
// }

// const server = http.createServer(theFile)

server.listen( port, () => {
    console.log('listening on port' + " " + port)
});