const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('./assets'));
app.use(expressLayouts);
//Extract style and script from layout page
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
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