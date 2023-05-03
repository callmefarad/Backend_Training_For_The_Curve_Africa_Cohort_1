const express = require( 'express' );
const userRouter = require( './routes/user')

const port = 7000;

const app = express();
app.use( express.json() );

app.get( '/', ( req, res ) => {
    res.send('API for learning authentication')
} )
app.use( '/api', userRouter );
app.listen( port, function() {
    console.log( 'listening on port ' + port );
})