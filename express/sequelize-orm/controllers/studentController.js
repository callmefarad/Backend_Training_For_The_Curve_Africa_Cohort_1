// const Student = require("../models/student");
const models = require( "../models" ); // loads the index.js file
const studentModel = models.Student;
const Validator = require( 'fastest-validator' );

/*
@ROUTE 'localhost:1111/api/'
@METHOD GET
@DESC Send welcome message to the client
*/
const welcomeMessage = ( req, res ) => {
    try {
        res.json( {
            message: "Welcome to RESTful API using nodejs and sequelize ORM."
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            message: error.message
        })
        }
}

/*
@ROUTE 'localhost:1111/api/students'
@METHOD GET
@DESC display all students
*/

const allStudent = async ( req, res ) => {
    try {
        // console.log(Student)
        const studentList = await studentModel.findAll();
        // console.log(studentList)
        if ( studentList.length === 0 ) {
            res.json( {
                message: "There are no student yet registered."
            })
        }else{
            res.status( 200 ).json( {
                message: "List of registered student",
                Total: studentList.length,
                data: studentList
            })
        }
    } catch ( error ) {
        res.status( 404 ).json( {
            message: error.message
        })
    }
}

/*
@ROUTE 'localhost:1111/api/students'
@METHOD POST
@DESC add a new student to the database table
*/
const addStudent = async (req, res) => {
    try {
        
        const student = {
            studentName: req.body.studentName,
            studentScore: req.body.studentScore
        }

        // define the object using validator schema
        const studentSchema = {
            studentName: { type: 'string', optional: false, min: '3' },
            studentScore: {type: 'number', optional: false}
        }

        // create an instance of the validator class
        const v = new Validator();
        const validatorResponse = v.validate( student, studentSchema );

        // check for validation errors
        if ( validatorResponse !== true ) {
            return res.status( 400 ).json( {
                message: 'Validation Failed',
                errors: validatorResponse
            })
        } else {
            const createdStudent = await studentModel.create( student );
            res.status( 201 ).json( {
                message: "New student was created.",
                data: createdStudent
            })
        }
    } catch ( error ) {
        res.status( 400 ).json( {
            message: error.message
        })
    }
}

/*
@ROUTE 'localhost:1111/api/students/:id'
@METHOD GET
@DESC get a student
*/

const singleStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await studentModel.findAll( {
            where: {id: id}
        } )
        if ( !student ) {
            res.status( 404 ).json( {
                message: `No student with id ${id}`
            })
        } else {
            console.log(student)
            res.status( 200 ).json( {
                message: `Student id: ${ id}`,
                data: student
            })
        }
    } catch ( error ) {
        res.status( 404 ).json( {
            message: error.message
        })
    }
}

/*
@ROUTE 'localhost:1111/api/students/:id'
@METHOD PATCH
@DESC update a student
*/

const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        let studentData = req.body;
        const updatedStudent = await studentModel.update( studentData, {
            where: {id: id}
        } )
        if ( !updatedStudent ) {
            res.status(400).json({message: `Something went wrong while trying to update ${studentData.studentName}`})
        } else {
            res.status( 200 ).json( {
                message: "Updated Successfully",
                data: updatedStudent
            })
        }
    } catch ( error ) {
        res.status( 400 ).json( {
            message: error.message
        })
    }
}

/*
@ROUTE 'localhost:1111/api/students/:id'
@METHOD DELETE
@DESC remove a student
*/
const removeStudent = async ( req, res ) => {
    try {
        const id = req.params.id;
        const deletedStudent = await studentModel.destroy( {
            where: {id: id}
        } )
        if ( !deletedStudent ) {
            res.status( 400 ).json( {
                message: `Something went wrong while trying to remove student with id: ${ id }`
            })
        } else {
            // helps client stay on the same page without navigating on successful request
            // res.status( 204 ).json( {
            //     message: "Deleted Successfully."
            // })
            res.status( 200 ).json( {
                message: "Deleted Successfully."
            })
        }
    } catch ( error ) {
        res.status( 400 ).json( {
            message: error.message
        })
    }
}


module.exports = {
    welcomeMessage,
    allStudent,
    addStudent,
    singleStudent,
    updateStudent,
    removeStudent,
}