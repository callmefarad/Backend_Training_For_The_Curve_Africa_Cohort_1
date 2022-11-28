// import the student model
const studentModel = require( '../studentModel/studentModel' )


// create a function that gets all students from the database using its defined model
const getAllStudent = async (req, res) => {
    try {
        const students = await studentModel.readAll();
        if ( !students ) {
            console.log('No student found in the database.')
        } else {
            res.writeHead( 200, { 'Content-Type': 'application/json' } )
            res.end(JSON.stringify(students))
        }
    }catch(error){
        res.end(JSON.stringify({"Message": error.message}))
    }
}


// function to get a single student from the database
const getStudent = async (req, res, id) => {
    try {
        const studentId = await studentModel.readOne(id);
        if ( !studentId ) {
            res.writeHead( 404, { "Content-Type": "application/json" } )
            res.end(JSON.stringify({"Message": `ID: ${studentId} does not exist`}))
        } else {
            res.writeHead( 200, { "Content-Type": "application/json" } )
            res.end( JSON.stringify( studentId ) );
        }
    } catch ( error ) {
        res.writeHead( 404, { "Content-Type": "application/json" } )
        res.end(JSON.stringify({"Message": error.message}))
    }
}

// // function for creating new student
// const createStudent = async (req, res) => {
//     try {
//         const data = {
//             name: "Ubani",
//             course: "FullStack",
//             gender: "Female",
//             duration: 8
//         }
//         const newStudent = await studentModel.create( data );
//         res.writeHead( 200, { "Content-Type": "application/json" } );
//         res.end(JSON.stringify(newStudent));
//     } catch ( error ) {
//         res.writeHead( 400, { "Content-Type": "application/json" } );
//         res.end(JSON.stringify({"Message": error.message}))
//     }
// }
// function for creating new student
const createStudent = async (req, res) => {
    try {
        let body = ''
        req.on( 'data', ( chunk ) => {
            body += chunk.toString()
        } );
        req.on( 'end', async () => {
            const { name, course, gender, duration } = JSON.parse(body);
            const newData = {
                name,
                course,
                gender,
                duration
            }
            const newStudent = await studentModel.create( newData );
            if ( !newStudent ) {
                console.log('Unable to create student')
            } else {
                res.writeHead( 200, { 'Content-Type': 'application/json' } )
                res.end( JSON.stringify( newStudent ) );
            }
            
        })
    } catch ( error ) {
        res.writeHead( 400, { "Content-Type": "application/json" } );
        res.end(JSON.stringify({"Message": error.message}))
    }
}

// function to update student
const updateStudent = async (req, res, id) => {
    try {
        const student = await studentModel.readOne( id );
        if ( !student ) {
            res.writeHead( 404, { "Content-Type": "application/json" } )
            res.end( JSON.stringify( { "Message": `Student with id: ${ id } is not found.` } ) )
        } else {
            let body = ''
            req.on( 'data', (chunk) => {
                body += chunk.toString();
            } )
            req.on( 'end', async () => {
                const { name, course, gender, duration } = JSON.parse( body );
                const newData = {
                    name: name || student.name,
                    course: course || student.course,
                    gender: gender || student.gender,
                    duration: duration || student.duration
                }

                const updatedStudent = await studentModel.updateModel( id, newData );
                
                res.writeHead( 200, { 'Content-Type': 'application/json' } );
                res.end(JSON.stringify(updatedStudent))
            } )
        }
    } catch(e) {
        res.writeHead( 400, { "Content-Type": "application/json" })
    }
}

// function to delete student from the database
const deleteStudent = async (req, res, id) => {
    try {
        const studentWithId = await studentModel.readOne( id )
        if ( !studentWithId ) {
            res.writeHead( 404, { "Content-Type": "application/json" } )
            res.end(JSON.stringify( {"Message": `There is no student with such id: ${id}`}))
        } else {
            await studentModel.deleteModel( studentWithId );
            res.writeHead( 200, { "Content-Type": "application/json" } );
            res.end(JSON.stringify( {"Message": "successfully deleted."}))
        }
    } catch ( error ) {
        res.writeHead( 400, { "Content-Type": "application/json" } )
        res.end(JSON.stringify({"Message": error.message}))
    }
}

// export the functions
module.exports = {
    getAllStudent,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}