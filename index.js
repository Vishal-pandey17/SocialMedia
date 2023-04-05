const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
var MongoDBStore = require('connect-mongodb-session')(session);

const { urlencoded } = require('express');
var store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/Social-Media',
    collection: 'mySessions'
  });
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
//Extract style and script from layout page
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up view Engine..
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,       /* when the user has not loggedIn in that case do i want to store
                                     extra data in session cookie? No i don't so it is false*/
    resave: false,                  /* when the identity is establish in session cookie so i not save 
                                       again and again so i do false*/
    cookie: {
        maxAge: (1000*60*100)   // milliseconds
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use Express Router..
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running Server, ${err}`); // interpolation
    }
    console.log(`Server is running on port: ${port}`);
})