const express = require( 'express' );
const router = express.Router();
const { newPost } = require( '../controllers/postController' );
const imageUpload = require( '../helpers/multer' );

router.post( '/posts', imageUpload, newPost );


module.exports = router;