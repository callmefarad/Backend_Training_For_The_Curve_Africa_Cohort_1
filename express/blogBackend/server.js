const express = require( 'express' );
const postRouter = require( './routers/postRoute' );
const userRouter = require( './routers/userRoute' );
const PORT = 1000;

const app = express();
app.use( express.json() );
app.use(express.static('./uploads'))

// welcome
app.get('/', (req, res)=>{
    res.send('Welcome to Kora blog')
} )

// image default route
app.use('/uploaded-image', express.static(process.cwd() + '/uploads'));
// default route
app.use( '/api', postRouter );
app.use( '/api', userRouter );

app.listen(PORT, ()=>{
    console.log('listening on port ' + PORT);
});
