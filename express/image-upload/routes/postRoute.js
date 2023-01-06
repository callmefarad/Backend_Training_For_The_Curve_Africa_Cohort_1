const express = require( 'express' )
const router = express.Router();
const { createPost, allPost, singlePost, updatePost, removePost} = require( '../controllers.js/postController' );
const imageUploader = require('../helpers/multer')


router.post( '/posts', imageUploader, createPost );
router.get( '/posts', allPost );
router.get( '/posts/:id', singlePost );
router.patch( '/posts/:id', imageUploader, updatePost );
router.delete( '/posts/:id', removePost );

module.exports = router;