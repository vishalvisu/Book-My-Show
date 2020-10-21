const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const  cookieParser= require('cookie-parser');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,useUnifiedTopology: true });
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cookieParser());
  app.use(express.json());

app.use(cors({credentials: true,'origin': 'http://localhost:3000'}));
app.use(
    express.urlencoded({
      extended: true
    })
  );
  

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
  console.log("we're connected!");
  });


  const userSchema= new mongoose.Schema({
      username:String,
      email: String,
      phone:String,
      password1:String
  });


  const userProfile= mongoose.model('userProfile',userSchema);
  
  const movieSchema= new mongoose.Schema({
    link: String,
    title:String,
    rating:String,
    desc: String,
    watch_now: String,
    Genre: String,
    Language:String,
    ReleaseWeek:String
  });

   const movie= mongoose.model('movie',movieSchema);

   var isValidated=false;


var maxAge=3*24*60*60;
var secretKey="821305";
const jwt_Token= function(id)
{
   return jwt.sign({id},secretKey,{expiresIn:maxAge});
};

function check_username (req,res)
{

console.log("Check username");

  userProfile.find({ 'username': req.body.username }, 'username', function (err,result) {
    if (err) console.log(err);
    else
        {
       if(result.length>0)
          res.send('Username is Already Taken');
       else
         check_phone(req,res);
        }
       });
}


function check_phone (req,res)
{

console.log("Check phone");

  userProfile.find({ 'phone': req.body.phone }, 'username', function (err,result) {
    if (err) console.log(err);
    else
        {
       if(result.length>0)
          res.send('Phone is Already Registered');
       else
         check_email(req,res);
        }
       });
}

function check_email (req,res)
{
  console.log("check email");

  userProfile.find({ 'email': req.body.email }, 'username', function (err,result) {
    if (err) console.log(err);
    else
        {
       if(result.length>0)
           res.send('Email is Already Registered');
       else
          save_new_user(req,res);
        }
       });
}

const saltRounds=7;
function save_new_user(req,res)
{
  bcrypt.genSalt(saltRounds, function(err, salt) 
  {
    bcrypt.hash(req.body.password1,salt, function(err, hash) 
    {
              req.body.password1=hash;
  const newUser= new userProfile(req.body);
  newUser.save(function (err,newUser) 
        { 
     if (err) return console.error(err);
     res.send('DATA SAVED');
        });
    });
  });
}

function validate_login(req,res)
{    
  console.log("Inside Validate");
  userProfile.find({ 'username': req.query.username},'password1 phone', function (err,result) 
{
  //console.log(result);
    if (err) console.log(err);
    else
        {
       if(result.length>0)
       {
        bcrypt.compare(req.query.password,result[0].password1, function(err,match) {
          if (match) {
            console.log("It matches!");
    //        console.log(result);
            let token= jwt_Token(result[0]._id);
            res.cookie("jwt",token,{maxAge:maxAge*1000});
            success(res);
          }
          else {
            console.log("Invalid password!");
            res.send("INVALID LOGIN NO SUCH USER EXISTS");
          }
        });
        }
        else
        res.send("INVALID LOGIN NO SUCH USER EXISTS"); 
       }      
       });
}

function success(res)
{
     isValidated= true;
     console.log(res);
    res.send("SUCCESS");
}

// HTTP REQUESTS

app.get('/', (req, res) => {
   
  console.log("REQUEST");
  let  token= req.cookies.jwt;
  if(token)
  {
    jwt.verify(token,secretKey,(err,decodedToken)=>{
           if(err)
           res.send("Invalid");
           else
           res.send("VALID");
    });
  }
    else
    res.send("Invalid");
});


app.get('/isLogin', (req, res) => {
   
  console.log("REQUEST");
  let  token= req.cookies.jwt;
  if(token)
  {
    jwt.verify(token,secretKey,(err,decodedToken)=>{
           if(err)
           res.send("Invalid");
           else
           res.send("VALID");
    });
  }
    else
    res.send("Invalid");
});



app.post('/sign_up/',function (req, res) {
    //console.log(req);
    console.log("post request is called");
     
    check_username(req,res);
  });


app.get('/login/', (req, res) => {
    console.log(req.cookies.jwt);
    console.log("server hit");

  //  let cooky= req.cookies.jwt;
    //res.send("SUCCESS");
    // console.log(cooky);
    validate_login(req,res);
}); 

app.get('/logout',(req,res)=>{

  res.clearCookie("jwt");
   res.send("LOGOUTTED");
});

app.get('/latestMovies',(req,res)=>{

  console.log(req.query);
  movie.find({'Language':req.query.Language, 'ReleaseWeek':req.query.ReleaseWeek,'Genre':req.query.Genre}, function(err,data) {
  //  console.log(data);
    
    res.send({movies:data});
 });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});