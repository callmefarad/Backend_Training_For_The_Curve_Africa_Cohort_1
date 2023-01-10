const express = require( 'express' );
const { welcomeMessage, allStudent, addStudent, singleStudent, updateStudent, removeStudent} = require('../controllers/studentController.js')

const router = express.Router();

// Route to welcome message
router.get( '/', welcomeMessage );

// Route for all students
router.get( '/students', allStudent )

// Route for new student
router.post( '/students', addStudent )

// Route for getting single student
router.get( '/students/:id', singleStudent )

// Route for updating single student
router.patch( '/students/:id', updateStudent )

// Route for updating single student
router.delete( '/students/:id', removeStudent )

module.exports = router;