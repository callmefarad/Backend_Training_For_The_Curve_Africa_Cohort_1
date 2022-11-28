const http = require( 'http' );
const fs = require( 'fs' );
PORT = 1800;

const server = http.createServer( ( req, res ) => {
    res.writeHead( 200, { 'Content-Type': 'text/html' } );
    fs.readFile( '../boy.html', ( err, data ) => {
        if ( err ) {
            console.log( "there was an error reading the file." )
                
        } else {
            res.end( data );
        }
    })
} );

server.listen( PORT, () => {
    console.log("listening on PORT" + " " + (PORT))
} );