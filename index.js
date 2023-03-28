const express = require('express');
const app = express();
const port = 8000;

// use Express Router..
app.use('/', require('./routes'));
// Set up view Engine..
app.set('view engine', 'ejs');
app.set('views', './views');




app.listen(port, function(err){
    if(err){
        console.log(`Error in running Server, ${err}`); // interpolation
    }
    console.log(`Server is running on port: ${port}`);
})