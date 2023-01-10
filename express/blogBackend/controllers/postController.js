const postModel = require( '../models' ).post;
const Validator = require( 'fastest-validator' );
const fs = require('fs');


const newPost = async ( req, res ) => {
    try {
        const post = {
            title: req.body.title,
            desc: req.body.desc,
            postImage: req.file.path,
            content: req.body.content,
            commentId: req.body.commentId
        }

        const postSchema = {
            title: {type: 'string', optional: false},
            desc: {type: 'string', optional: false},
            postImage: {type: 'string', optional: true},
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

// get on post
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
        await fs.unlinkSync( post[0].postImage );
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

// update post
const updatePost = async ( req, res ) => {
    try {
        const postData = {
            title: req.body.title,
            desc: req.body.desc,
            postImage: req.file.path,
            content: req.body.content,
        }

        const postSchema = {
            title: {type: 'string', optional: false},
            desc: {type: 'string', optional: false},
            postImage: {type: 'string', optional: true},
            content: {type: 'string', optional: false},
        }

        let v = new Validator();
        const validatorResponse = v.validate(postData, postSchema)
        const id = req.params.id;
        const post = await postModel.findAll({
            where: {
                id: id
            }
        })
        if ( validatorResponse !== true ) {
            return res.status( 400 ).json( {
                message: 'Validation Failed',
                errors: validatorResponse[0].message
            })
        } else {
            await fs.unlinkSync(post[0].postImage)
            const updatedPost = await postModel.update( postData, {
                where: {id: id}
            })
            res.status( 201 ).json( {
                message: "Post updated successfully.",
                data: updatedPost
            })
        }
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