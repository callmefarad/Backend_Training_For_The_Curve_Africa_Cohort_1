const express = require('express');
const studentRouter = require("./routes/studentRoute.js");

const port = 1111;

const app = express();
app.use( express.json() );

app.listen( port, () => {
    console.log(`Listening to port: ${port}`);
} )

app.use( '/api', studentRouter );