const express = require('express');
const hbs = require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;

var server = express();
hbs.registerHelper('noop', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});


hbs.registerPartials(__dirname + '/views/partials')

server.set('view engine','hbs')
server.use(express.static(__dirname + '/public'));    //middleware
server.use((req, res, next)=>{
var now = new Date().toString();
var log=  `${now}: ${req.method} ${req. url}`
fs.appendFile('server.log', log +'\n', function (err) {
  if (err) {
  console.log('unable to append server')
}
});
    next();                //fs.aapendFile('server.log', log + '\n')
    });      //console.log(`${now}: ${req.method} ${req. url}`); //user kis page ke liye request krta he wo nd method define

//server.use((req,res,next)=>{
  //res.render("maintance.hbs")
//});
server.use(express.static(__dirname + '/public'));

server.get('/',(req,res)=>{
  res.render( "home.hbs", {
    pagetitle :"Home page",
    //currentyear: new Date().getFullYear(),
    message:"welcome to home page"
  })
});
server.get('/projects',(req,res)=>{
  res.render( "projects.hbs", {
    pagetitle :"portfolio page"
    //currentyear: new Date().getFullYear(),

  })
});


server.get('/about',(req,res)=>{       //route and handler(request handler)
  res.render('about.hbs', {
    pagetitle :"About page",
    //currentyear:new Date().getFullYear()
  });               // res.send('<h1>Hello Express about</h1>');
});
server.use(express.static(__dirname + '/public'));


server.get('/bed',(req,res)=>{s
  res.send({
  errorMessage: 'unable to full fil ur request'
  });
});
server.listen(port ,()=>{
console.log(`server is up ready to go ${port}`)//terminal pe msg print hoga
});
