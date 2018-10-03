const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();

// Set partials pages root folder
hbs.registerPartials(__dirname + '/views/partials');
// Set hbs to be the app view engine
app.set('view engine', 'hbs');
// *middleware
// Create header logger:
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    // Log date, req method and url:
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log...');
        }
    });

    //app will not continue if MiddleWare doesnt call next
    next();
});

// *middleware
// Create Maintenance middleware:
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// *middleware
// Create a Static location/address for app - get html files or any other resource
app.use(express.static(__dirname + '/public'));

// Register a hbs helper - get the callback return value inside the page/partial:
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
// Register a hbs helper with args - get the callback return value inside the page/partial:
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        // Injecting ing data into the html page:
        pageTitle: 'Home page',
        welcomeMsg: 'Welcome to Home page :)'
    });
}); 

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        // Injecting ing data into the html page:
        pageTitle: 'About page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        // Injecting ing data into the html page:
        pageTitle: 'My projects:',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMsg: 'Error handling request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


//https://pacific-wildwood-56761.herokuapp.com/