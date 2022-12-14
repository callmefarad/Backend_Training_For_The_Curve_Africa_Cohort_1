import( './config/dbConfig.js' );
import express from 'express';
import saleRouter from './routes/saleRoute.js'
// import db from './config/dbConfig.js';

const port = 1010;
const app = express();

// another method to connect to the database
// try {
//     db.authenticate();
//     console.log("Connection successful")
// } catch ( error ) {
//     console.log('There was an error while trying to connect to the database.')
// }

app.use( express.json() )
app.use('/api/v1', saleRouter)
app.listen( port, () => {
    console.log("Listening to port: " + port);
})