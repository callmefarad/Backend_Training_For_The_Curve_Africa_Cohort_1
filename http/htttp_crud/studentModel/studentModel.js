// import the database
const studentDB = require( '../studentDB/studentDB.json' )
// import the uuid package
const { v4: uuidv4 } = require( 'uuid' )
// import the file system module
const fs = require('fs');
const { resolve } = require( 'path' );

// functional model to retrieve all students
const readAll = () => {
    return new Promise( (resolve, reject) => {
        resolve(studentDB)
    });
}

// functional model to retrieve a single student
const readOne = (id) => {
    return new Promise( (resolve, reject) => {
        const studentId = studentDB.find( ( st ) => st.id === id );
        resolve(studentId)
    });
}

// functional model to create new student 
const create = (createdStudent) => {
    return new Promise( ( resolve, reject ) => {
        const student = { id: uuidv4(), ...createdStudent }
        studentDB.push( student );
        fs.writeFileSync( './studentDB/studentDB.json', JSON.stringify(studentDB), 'utf8', (error) => {
            if ( error ) {
                console.log(error.message)
            } else {
                console.log('Successfully Written to File.')
            }
        });
        resolve(student)
    });
}

// create the update model for student
const updateModel = (id, studentToUpdate) => {
    return new Promise( ( resolve, reject) => {
        const studentIndex = studentDB.find( ( i ) => i.id === id );
        studentDB[ studentIndex ] = { id, ...studentToUpdate }
        studentDB.push( studentDB[ studentIndex ] );
         fs.writeFileSync( './studentDB/studentDB.json', JSON.stringify(studentDB), 'utf8', (error) => {
            if ( error ) {
                console.log(error.message)
            } else {
                console.log('Successfully Written to File.')
            }
        });
        resolve(studentDB[studentIndex]);
    } );
}

// create a delete model
const deleteModel = (id) => {
    return new Promise( (resolve, reject) => {
        filteredStudent = studentDB.filter( ( f ) => f.id !== id );
        fs.writeFileSync( './studentDB/studentDB.json', JSON.stringify(filteredStudent), 'utf8', (error) => {
            if ( error ) {
                console.log(error.message)
            } else {
                console.log('Successfully Written to File.')
            }
        } );
        resolve();
    });
}

module.exports = {
    readAll,
    readOne,
    create,
    updateModel,
    deleteModel
}