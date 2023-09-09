const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const path = require('path');
const colors = require('colors');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

app.set('view engine' , 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'routes')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

const routes = require('./routes/routes');


app.use('/', routes);


app.listen(port , () => {
    console.log(`website hosted in port ${port}`.rainbow);
})
