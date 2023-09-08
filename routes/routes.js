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
            if(results.length > 0){

                const data = results[0];
                const comments = {
                    author : data.comment_author,
                    comment : data.comment_text
                }
                res.render('comments' , {comments});
            }
            else{
                const comments = {
                    author : '',
                    comment : ''
                }
                res.render('comments' , {comments});
            }
        }
    });
    

});

router.get('/new-comment' , (req,res) => {
    res.render('new-comment');
});

router.post('/new-comment' , (req, res) => {
    const {author , comment} = req.body;

    db.query('INSERT INTO comment (comment_id , comment_author) VALUES (?,?)', [comment , author] , (err, result) => {
        if(err){
            console.log('New comment not created'.rainbow);
        }
        else{
            console.log('New comment added'.rainbow);
            res.redirect('/');
        }
    });
})

module.exports = router;