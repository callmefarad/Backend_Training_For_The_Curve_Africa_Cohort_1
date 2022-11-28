const mysql = require( 'mysql' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

const app = express();
app.use( express.json() );
app.use( bodyParser.json() );

/* 
Add the query below to grant you AUTHENTICATION for your mysql.
Note: 'password' will be the password specified when installing mysql workbench which must also match with the password specified on your node mysql connection.

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
*/


// configure a mysql connection
let mysqlConnection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'testDB',
    multipleStatements: true
} );

// activate a connection
mysqlConnection.connect( (error) => {
    if ( error ) {
        console.log( 'Connection Failed' + JSON.stringify(error, undefined, 2) );
    } else {
        console.log( 'Connection established')
    }
} )

const port = 2023;
app.listen( port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Start query
// Get all table data
app.get( '/students', (req, res) => {
    mysqlConnection.query( 'SELECT * FROM testDetails', (error, rows, fields) => {
        if ( error ) {
            console.log(error)
        } else {
            res.status( 200 ).json( {
                data: rows
            })
        }
    })
} );

// get a single row from the table
app.get( '/students/:id', ( req, res ) => {
    mysqlConnection.query( 'SELECT * FROM testDetails WHERE id=?', [ req.params.id ], ( err, rows, fields ) => {
        if ( err ) {
            console.log('Error while trying to fetch a single row.')
        } else {
            res.status( 200 ).json( {
                data: rows
            })
        }
    })
} )

app.post( '/students', (req, res) => {
    let student = req.body;
    console.log( student );
    let sql = `SET @id=?; SET@name=?; SET@age=?;
    CALL studentAddOrEdit(@id, @name, @age );`;
mysqlConnection.query( sql, [ student.id, student.name, student.age ], ( err, rows, fields ) => {
    if ( !err ) {
        rows.forEach( ( e ) => {
            if ( e.constructor == Array ) {
                res.send( 'New Student ID:' + e[ 0 ].id );
            }
        } );
    } else {
        console.log( err.message )
    }
} );
} );

app.patch( '/students', ( req, res ) => {
    let student = req.body;
    let sql = `SET @id=?; SET@name=?; SET@age=?;
    CALL studentAddOrEdit(@id, @name, @age );`;

    mysqlConnection.query( sql, [ student.id, student.name, student.age ], (err, rows, fields) => {
        if ( !err ) {
            rows.forEach( ( e ) => {
                if ( e.constructor == Array ) {
                    res.status( 200 ).json( {
                        message: "Updated Successfully",
                        data: rows
                    })
                    // res.send('updated successfully');
                }
            });
        } else {
            console.log(err.message)
        }
    })
})

app.delete( "/students/:id", (req, res) => {
    mysqlConnection.query( 'DELETe FROM testDetails WHERE id=?', [ req.params.id ], ( err, rows, fields ) => {
        if ( !err ) {
            res.status( 200 ).json( {
                message: "Student is deleted successfully."
            })
        } else {
            console.log( err.message)
        }
    });
});
