// working with the switch control
// initialize your check variable
let day;

// create a switch statement
switch (new Date().getMonth()) {
    case 0:
        day = "January"
        break;
    case 1:
        day = "February"
        break;
    case 2:
        day = "March"
        break;
    case 3:
        day = "April"
        break;
    case 4:
        day = "May"
        break;
    case 5:
        day = "June"
        break;
    case 6:
        day = "July"
        break;
    case 7:
        day = "August"
        break;
    case 8:
        day = "September"
        break;
    case 9:
        day = "October"
        break;
    case 10:
        day = "November"
        break;
    case 11:
        day = "December"
        break;
    default:
        day = "No current day"
}

console.log(`Today is: ${day}`)

// console.log(new Date().getFullYear())

// import the http module
const http = require( 'http' );
// import the file system module
const fs = require( 'fs' );
// create a connection port for the server
const PORT = 1818;

// create a server with the http instance
const app = http.createServer( ( req, res ) => {
    // using switch to route on different endpoints
    switch (req.url) {
        case '/boy': //first endpoint
            fs.readFile( '../boy.html', ( error, data ) => {
                if ( error ) {
                    alert( "Run oooooooo" )
                } else {
                    res.end( data )
                }
            } )
            break;
        case '/girl': //second endpoint
            fs.readFile( '../girl.html', ( error, data ) => {
                if ( error ) {
                    alert( "Run oooooooo" )
                } else {
                    res.end( data )
                }
            } )
            break;
        case '/man': //third endpoint
            fs.readFile( '../man.html', ( error, data ) => {
                if ( error ) {
                    alert( "Run oooooooo" )
                } else {
                    res.end( data )
                }
            } )
            break;
        case '/woman': //forth endpoint
            fs.readFile( '../woman.html', ( error, data ) => {
                if ( error ) {
                    alert( "Run oooooooo" )
                } else {
                    res.end( data )
                }
            } )
            break;
        default: //fall back endpoint
            fs.readFile( '../welcome.html', ( error, data ) => {
                if ( error ) {
                    alert( "Run oooooooo" )
                } else {
                    res.end( data )
                }
            } )
        
    }
} )

// connect the server to the port
app.listen( PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})