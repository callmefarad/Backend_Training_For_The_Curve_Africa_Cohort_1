const postModel = require( '../models' ).post;
const fs = require('fs');

// create new student
const createPost = async ( req, res ) => {
    try {
        const postData = {
            title: req.body.title,
            captionImage: req.file.path,
            desc: req.body.desc,
            content: req.body.content,
            commentId: req.body.commentId
        }

        const newPost = await postModel.create( postData )
        if ( !newPost ) {
            res.status( 400 ).json( {
                message: "Unable to create new student"
            })
        } else {
            res.status( 200 ).json( {
            message: "new post created",
            data: newPost
        })   
        }
    } catch ( e ) {
        res.status( 404 ).json( {
            message: e.message
        })
    }
}

// get all posts
const allPost = async (req, res) => {
    try {
        const posts = await postModel.findAll();
        if ( posts.length === 0 ) {
            res.status(200).json({ message: "No posts found"})
        } else {
            res.status( 200 ).json( {
                message: "All Post",
                data: posts
            })
        }
    } catch ( error ) {
        res.status( 404 ).json( {
            message: error.message
        })
    }
}

// get a post
const singlePost = async(req, res) => {
    try {
        const id = req.params.id;
        const post = await postModel.findAll( {
            where: {
                id: id
            }
        } )
        if ( !post ) {
            res.status(404).json({ message: `No user with this id: ${id}`})
        }else{
            res.status( 200 ).json( {
                data: post
            })
        }
    } catch ( error ) {
        res.status( 404 ).json( {
            message: error.message
        })
    }
}

// update a post
const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            title: req.body.title,
            captionImage: req.file.path,
            desc: req.body.desc,
            content: req.body.content
        }
        const updatedPost = await postModel.update( data, {
            where: {
                id: id
            }
        } )
        res.status( 200 ).json( {
            message: "Updated successfully",
            data: updatedPost
        })
    } catch ( error ) {
        res.status(400).json({ message: error.message})
    }
}

// remove post
const removePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await postModel.findAll({
            where: {id: id},
        } )
        if ( !post ) {
            res.status(404).json({message: `wrong post id ${id}`})
        } else {
            await postModel.destroy({where: {id: id}} );
            res.status(200).json({message: 'Deleted successfully'})
        }
        await postModel.destroy( id );
        
    } catch ( error ) {
        res.send(error.message)
    }
}

module.exports = {
    createPost,
    allPost,
    singlePost,
    updatePost,
    removePost
}