const express = require( 'express' );
const postRouter = require( './routers/postRoute' );

const PORT = 1000;

const app = express();

app.use( express.json() );
app.use(express.static('./uploads'))

app.listen(PORT, ()=>{
    console.log('listening on port' + PORT);
});

// welcome
app.get('/', (req, res)=>{
    res.send('Welcome to Kora blog')
} )
app.use( '/api', postRouter )
app.use('/uploaded-image', express.static('./uploads'))