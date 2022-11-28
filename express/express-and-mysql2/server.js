// import mysql
const mysql = require('mysql');
// import express library
const express = require( 'express' );
const { json } = require( 'express' );

// create an application instance
const app = express();

// call a middleware
app.use( express.json() );

// create a connection config
let mysqlConnection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'theCurveDB',
    multipleStatements: true,
} );


// connect to the database
mysqlConnection.connect( () => {
    console.log('Database connection successful');
});

// test for endpoint
app.get( "/", ( req, res ) => {
    res.send("Welcome to our new express api") 
} );

// get all students
app.get( "/students", ( req, res ) => {
    mysqlConnection.query( 'SELECT * FROM studentBio', ( err, rows, fields ) => {
        if ( err ) {
            console.log( err.message )
        } else {
            res.status( 200 ).json( {
                message: "All students of The_Curve",
                data: rows
            } )
        }
    } );
} );

// get a single student from the studentBio table
// approach one
// app.get( "/students/:id", (req, res) => {
//     mysqlConnection.query( 'SELECT * FROM studentBio WHERE id=?', [ req.params.id ], (err, rows, fields) => {
//         if ( !err ) {
//             res.status( 200 ).json( {
//                 message: "Student was successfully retrieved",
//                 data: rows
//             })
//         } else {
//             console.log( err.message );
//             res.status( 404 ).json( {
//                 message: err.message
//             })
//         }
//     });
// } );

// approach two
app.get( '/students/:id', async ( req, res ) => {
    try {
        let id = req.params.id;
        await mysqlConnection.query( `SELECT * FROM studentBio WHERE id=${ id }`, ( err, rows, fields ) => {
            if ( !err ) {
                res.status( 200 ).json( {
                    message: "Student was successfully retrieved",
                    data: rows
                } )
            } else {
                console.log( err.message );
                res.status( 404 ).json( {
                    message: err.message
                } );
            }
        } );
    } catch ( err ) {
        res.status( 404 ).json( {
            message: err.message
        } );
    }
} );

// remove a record from a database table
app.delete( '/students/:id', ( req, res ) => {
    let id = req.params.id;
    mysqlConnection.query( `DELETE FROM studentBio WHERE id=${ id }`, (err, rows, fields) => {
        if ( !err ) {
            res.status( 200 ).json( {
                message: "Student is deleted successfully"
            })
        } else {
            res.status( 404 ).json( {
                message: err.message
            })
        }
    });
} );

// add a new record to the database table

// create a port
const port = 3030;
app.listen( port, () => {
    console.log( 'listening on port: ' + port );
} );