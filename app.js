const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const path = require('path');
const colors = require('colors');
const routes = require('routes/routes.js');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Comment-section'
});

db.connect(err => {
    if(err){
        console.log('Database connection failed!'.rainbow);
    }
    else{
        console.log('Database connected'.rainbow);
    }
});

app.set('view engine' , 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'routes')));
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port , () => {
    console.log(`website hosted in port ${port}`.rainbow);
})
