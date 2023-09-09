const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comments-section'
});

db.connect(err => {
    if(err){
        console.log('Database connection failed!'.rainbow);
    }
    else{
        console.log('Database connected'.rainbow);
    }
});


router.get('/' , (req , res) => {

    db.query('SELECT * FROM comment', (err , results) => {
        if(err){
            console.log('error in fetching comment data'.rainbow);
        }
        else{
            res.render('comments' , {comments : results});
        }
    });
    

});

router.get('/new-comment' , (req,res) => {
    res.render('new-comment');
});

router.post('/new-comment' , (req, res) => {
    const {author , comment} = req.body;

    db.query('INSERT INTO comment (comment_text , comment_author) VALUES (?,?)', [comment , author] , (err, result) => {
        if(err){
            console.log('New comment not created'.rainbow);
        }
        else{
            console.log('New comment added'.rainbow);
            res.redirect('/');
        }
    });
});

router.get('/comments/:id' , (req , res) => {
    const id = req.params.id;

    db.query('SELECT * FROM comment WHERE (comment_id) = (?)' , [id] , (err,results) => {
        if(err){
            console.log('error fetching comment with id'.rainbow,id.rainbow,err);
        }
        else{
            res.render('view-comment' , {comments : results});
        }
    });

});

module.exports = router;