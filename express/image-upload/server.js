const express = require( 'express' );
const postRoute = require('./routes/postRoute')

const port = 2023;

const app = express();
app.use( express.json() );
app.use(express.static('./uploads'))
app.get( '/', (req, res) => {
    res.json( {
        message: "Welcome to Kora API"
    })
})
app.use( '/api', postRoute );
app.use('/post-images', express.static('./uploads'))


app.listen( port, () => {
    console.log( 'listening on port ' + port );
})