// const express = require('express');
// //exress app
// const app= express();

// //register view engine
// app.set('view engine','ejs');
// app.set('views','viewsForApp')
// //views is defalt but for your own folderwrite
// // app.set('views','myviews')
// //listen for requests
// app.listen(3000);

// app.get('/',(req,res)=>{
//     //res.send("./views/index.html");
//     //res.sendFile('./views/index.html',{root:__dirname})
//     res.render('index',{title: 'Home'});
// })
// app.get('/about',(req,res)=>{
//     //res.sendFile('./views/about.html',{root:__dirname})
//     res.render('about',{title: 'About'})
// })

// //redirect
// app.get('/about-me',(req,res)=>{
//     res.redirect('/about');
// })
// //404 page
// app.use((req,res)=>{
//     //res.status(404).sendFile('./views/404.html',{root:__dirname})
//     res.status(404).render('404',{title: 404})
// })
// //if we write 404 page is top above the any other request it will fire it only with out 404 code

const express = require('express');
const mongoose = require('mongoose')

const morgan= require('morgan');
const { result } = require('lodash');
const blogRoutes=require('./routes/blogRoutes')
// express app
const app = express();
//connection to db

const dbURI = 'mongodb+srv://Coder16:JBZLm5rLDm3Y4KQ@cluster0.5ysi1.mongodb.net/Node-project?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to the db')
        app.listen(3000)
    })
    .catch((err) => {
        console.log('not connected')
    })

// listen for requests
//app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'viewsForApp')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
   res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
app.use(blogRoutes)
 
// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});