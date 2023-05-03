const express = require( 'express' );
const router = express.Router();
const {signUp, logIn, getAll, getOne} = require('../controllers/user')


router
    .route( '/users' )
    .post( signUp )
   
router.route( '/logIn' ).post( logIn )
router.route( '/allData' ).get( getAll )
router.route('/allData/:id').get(getOne)
    

module.exports = router;