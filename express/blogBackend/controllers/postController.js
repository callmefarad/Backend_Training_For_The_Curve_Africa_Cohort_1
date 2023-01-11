require( 'dotenv' ).config();
const postModel = require( '../models' ).post;
const Validator = require( 'fastest-validator' );
const fs = require( 'fs' );
const cloudinary = require('../helpers/cloudinary');


const newPost = async ( req, res ) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const post = {
            title: req.body.title,
            desc: req.body.desc,
            postImage: req.file.path,
            cloudUrl: result.secure_url,
            cloudId: result.public_id,
            content: req.body.content,
            commentId: req.body.commentId
        }

        // console.log(result)
        const postSchema = {
            title: {type: 'string', optional: false},
            desc: {type: 'string', optional: false},
            postImage: {type: 'string', optional: true},
            cloudUrl: {type: 'string', optional: false},
            cloudId: {type: 'string', optional: false},
            content: {type: 'string', optional: false},
            commentId: {type: 'string', optional: false},
        }
        const v = new Validator();
        const validatorResponse = v.validate( post, postSchema );

        const createdPost = await postModel.create( post );
        if ( validatorResponse !== true ) {
            return res.status( 400 ).json( {
                message: 'Validation Failed',
                errors: validatorResponse[0].message
            })
        } else {
            res.status( 201 ).json( {
                message: "New post was created.",
                data: createdPost
            })
        }
    } catch ( error ) {
        res.status( 400 ).json( {
            message: error.message
        })
    }
}

// update post
const updatePost = async ( request, res ) => {
    try {
        const id = request.params.id;
        const post = await postModel.findAll( {
            where: { id: id}
        } )
        
        // console.log(post[ 0 ].postImage)
        // console.log(post[ 0 ].cloudId)
        // res.send( 'updated' );

        const result = await cloudinary.uploader.upload(request.file.path)
        const postData = {
            title: request.body.title,
            desc: request.body.desc,
            postImage: request.file.path,
            cloudUrl: result.secure_url,
            cloudId: result.public_id,
            content: request.body.content,
        }

        const postSchema = {
            title: {type: 'string', optional: true},
            desc: {type: 'string', optional: true},
            postImage: {type: 'string', optional: true},
            cloudUrl: {type: 'string', optional: true},
            cloudId: {type: 'string', optional: true},
            content: {type: 'string', optional: true},
        }

        let v = new Validator();
        const validatorResponse = v.validate(postData, postSchema)
        if ( validatorResponse !== true ) {
            return res.status( 400 ).json( {
                message: 'Validation Failed',
                errors: validatorResponse[0].message
            })
        } else {
            await cloudinary.uploader.destroy( post[ 0 ].cloudId );
            await fs.unlinkSync( post[ 0 ].postImage );
            const updatedPost = await postModel.update( postData, {
                where: {id: id}
            }, {
                new: true})
            res.status( 201 ).json( {
                message: "Post updated successfully.",
                data: updatedPost
            })
        }
    } catch ( error ) {
        res.status( 400 ).json( {
            message: error.message,
        })
    }
}

// Get all post
const allPost = async(req, res)=>{
    try {
        const posts = await postModel.findAll();
        if ( posts.length === 0 ) {
            res.status(200).json({ message: "No posts found in the database."})
        } else {
            res.status( 200 ).json( {
            message: "All Posts",
            data: posts
        })
        }
    } catch ( error ) {
        res.status(404).json({
            message: error.message
        })
    }
}

// get a post
const singlePost = async (req, res)=>{
    try {
        const id = req.params.id;
        const post = await postModel.findAll( {
            where: {
                id: id
            }
        })
        if ( !post ) {
            res.status( 404 ).json( {
                message: `Can not find post with id: ${id}`
            })
        }else{
            res.status(200).json({
                data: post
            })
        }
    } catch ( error ) {
        res.status( 404 ).json( {
            message: error.message
        })
    }
}

// remove post
const removePost = async ( req, res ) => {
    try {
        const id = req.params.id;
        const post = await postModel.findAll( {
            where: { id: id}
        } )

        // remove uploaded from the upload folder;
        await fs.unlinkSync( post[ 0 ].postImage );
        await cloudinary.uploader.destroy(post[ 0 ].cloudId)
        await postModel.destroy({
        where: { id: id }
    } )
        res.status( 200 ).json( {
            message: "Deleted successfully."
        })
    } catch ( error ) {
        res.status( 400 ).json( {
            message: error.message
        })
    }
}

module.exports = {
    newPost,
    allPost,
    removePost,
    singlePost,
    updatePost
}