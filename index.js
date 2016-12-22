// requires
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var path = require('path');


//global vars
var app = express();
var db = require('./models');
//set/user
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

//routes
//get home page
app.get("/", function(req,res) {
    res.render("site/home");
});
//get all articles
app.get('/articles', function(req,res){
    db.article.findAll().then(function(articles){
      console.log("returned all articles");
      res.render('articles/show', {articles: articles});
    // res.render('articles/show');
    });
});
//get one article
app.get('/article/:id', function(req,res){
    db.article.findById(req.params.id).then(function(article){
        res.render('articles/oneArticle', {article: article});
    });
});


//get new article form
app.get('/articles/new', function(req, res){
    res.render('articles/newArticle');
});
app.post('/articles/new', function(req,res){
    // console.log(req.body);
    db.article.create(req.body).then(function(article){
        res.redirect('/articles');
    });
});

//update item
app.get('/articles/edit/:id', function(req, res){
    db.article.findById(req.params.id).then(function(article){
          res.render('articles/editArticle', {article: article});
      });
});
app.put('/articles/:id', function(req, res) {
  var articleContent = req.body.content;
  var articleTitle = req.body.title;
  var articleId = req.params.id;
      db.article.update(
        {title: articleTitle,content: articleContent}, {where: {id: articleId}
      }).then(function(user) {
      });
      
  res.send({message: 'success'});
});



//delete item
app.delete('/article/:id', function(req, res){
    console.log("trying to delete");
    var articleToDelete = req.params.id;
    console.log("this "+ articleToDelete);
    db.article.destroy({
          where: { id: articleToDelete }
    }).then(function(articleToDelete) {
        console.log("trying to redirect to /articles" );
        res.send();
      // do something when done deleting
    });
});


//static pages
app.get('/about', function(req,res){
    res.render('site/about');
});
app.get('/contact', function(req,res){
    res.render('site/contact');
});
//listen
var port = 3000;
app.listen(port);
