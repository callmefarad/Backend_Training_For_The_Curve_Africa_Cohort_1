// import http module
const http = require( 'http' );
// import all the controller functions
const {getAllStudent, getStudent, createStudent, updateStudent,deleteStudent} = require('./studentController/studentController')

// create a connection port
const PORT = 5050;

// create an application with the http instance
const app = http.createServer( ( req, res ) => {
    if ( req.url === '/api/students' && req.method === 'GET' ) {
        res.writeHead( 200, { "Content-Type": "application/json" } )
        getAllStudent( req, res );
    } else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split( "/" )[ 3 ];
        // console.log( id );
        getStudent(req, res, id);
    } else if (req.url === '/api/students' && req.method === 'POST') {
        res.writeHead( 200, { "Content-Type": "application/json" } )
        createStudent(req, res);
    }else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split( "/" )[ 3 ];
        // console.log( id );
        updateStudent( req, res, id );
    }else if (req.url.match(/\/api\/students\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split( "/" )[ 3 ];
        // console.log( id );
        deleteStudent( req, res, id );
    }
});

// connect the server to the defined port
app.listen( PORT, () => {
    console.log(`Sever is connected to port: ${PORT}`);
})