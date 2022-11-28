// import the http module
const http = require( 'http' );
// declare a port
const PORT = 1000;

// create a server
const server = http.createServer( ( req, res ) => {
    res.writeHead( 200, { 'Content-Type': 'text/plain' } );
    res.write( 'Hello HTTP SERVER' );
    res.end();
});

// connect the server to a port
server.listen(PORT,() => {
    console.log( `Server is listening to port: ${ PORT }` );
} );
