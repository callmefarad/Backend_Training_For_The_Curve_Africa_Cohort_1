const router = require( 'express' ).Router();
const {signUp} = require('../controllers/userController')


router
    .route( '/users' )
    .post( signUp );

module.exports = router;