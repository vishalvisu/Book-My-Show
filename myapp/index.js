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
   
   const movies_in_cities=new mongoose.Schema({
       City:String,
       List:Array
   });

//   obj={
  //   "City":"Kolkata",
 //     "List":["Mirzapur"]
 ///  };

   const movies_list_in_cities= mongoose.model('movies_list_in_cities',movies_in_cities);
  // const nobj= new movies_list_in_cities(obj);
   
  /* nobj.save(function(err,obj){
               if(err)
              console.log(err);
              else
              console.log("Data Saved"); 
   });*/

   const CityMovieCinemasIdSchema=new mongoose.Schema({
    City:String,
    title:String,
    CinemasId:Array
});

const CityMovieCinemasId= mongoose.model('CityMovieCinemasId',CityMovieCinemasIdSchema);

/*obj={

  "City":"Kolkata",
  "title":"Mirzapur",
  "CinemasId":["kol123","kol124","kol125","kol126"]
};

const nobj= new CityMovieCinemasId(obj);

nobj.save(function(err,obj){
  if(err)
 console.log(err);
 else
 console.log("Data Saved"); 
});*/

const CityCinemaIdCinemaNameSchema= new mongoose.Schema({
  City:String,
  CinemaNamewithCinemaId:Array
});

const CityCinemaIdCinemaName= mongoose.model('CityCinemaIdCinemaName',CityCinemaIdCinemaNameSchema);

/*obj={
  
  "City":"Kolkata",
  "CinemaNamewithCinemaId":[{"kol123":"newMax"},{"kol124":"Plaza"},{"kol125":"CityMall"},{"kol126":"cityCentre"}]
};

const nobj= new CityCinemaIdCinemaName(obj);

nobj.save(function(err,obj){
  if(err)
 console.log(err);
 else
 console.log("Data Saved"); 
});*/

const CinemaTimingSchema= new mongoose.Schema({
  CinemaId:String,
  timing:Array
});

const CinemaTiming = mongoose.model('CinemaTiming',CinemaTimingSchema);

//format_date=month/date/year

const ShowSchema= new mongoose.Schema({
   title:String,
   CinemaId:String,
   fotmat_date: String,
   format_time: String,
   Seat_Layout: String
});

/*let avl="";
for(let i=0;i<=99;i++)
   avl+="1";

obj={

  title:"Mirzapur",
  CinemaId:"KOL123",
  fotmat_date:new Date().toLocaleDateString(),
  format_time:"9:10-11:30",
  Seat_Layout:avl

};*/

const ShowDetails = mongoose.model('ShowDetails',ShowSchema);

/*const nobj= new ShowDetails(obj);

nobj.save(function(err,obj){
  if(err)
 console.log(err);
 else
 console.log("Data Saved"); 
});*/

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
//  console.log("check email");

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
 // console.log("Inside Validate");
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
    //        console.log("It matched!");
    //        console.log(result);
            let token= jwt_Token(result[0]._id);
            res.cookie("jwt",token,{maxAge:maxAge*1000});
            success(res);
          }
          else {
    //        console.log("Invalid password!");
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
  //   console.log(res);
    res.send("SUCCESS");
}

// HTTP REQUESTS 
// REQUESTS
// STARTS 
// HERE


app.get('/', (req, res) => {
   
//  console.log("REQUEST");
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
   
 // console.log("REQUEST");
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
    //console.log("post request is called");
     
    check_username(req,res);
  });


app.get('/login/', (req, res) => {
   // console.log(req.cookies.jwt);
  //  console.log("server hit");

    validate_login(req,res);
}); 

app.get('/logout',(req,res)=>{

  res.clearCookie("jwt");
   res.send("LOGOUTTED");
});

app.get('/latestMovies',(req,res)=>{

  let ans=[],
  Genre=req.query.Genre,
  Language=req.query.Language;
  
 // console.log(req.query);
  movies_list_in_cities.find({'City':req.query.City},function(err,list){
          if(err)
          res.send({movies:ans});
          else if(list.length==0)
          res.send({movies:ans});
          else
          {
       //     console.log(list[0].List);
              movie.find({}, function(err,data) {
                for(let i=0;i<data.length;i++)
                {
                  for(let j=0;j<list[0].List.length;j++)
                  {
          if(data[i].title==list[0].List[j]&&(Genre==''||Genre==data[i].Genre)&&(Language==''||Language==data[i].Language))
                      ans.push(data[i]);
                  }
                }
                res.send({movies:ans});
                });
          }
  });
});

app.get('/theatres',(req,res)=>{
  
//  console.log("Inside Theatres ");
//console.log(req.query);

  CityMovieCinemasId.find({ 'City': req.query.City,'title':req.query.title },function (err,list)
{
    if(err)
    res.send(err);
    else if(list.length==0)
    res.send("No Result");
    else
    {
      let cinemasId= list[0].CinemasId;

      CityCinemaIdCinemaName.find({'City':req.query.City},function(err,result){
          if(err)
          res.send(err);
          else
          {
            let list=result[0].CinemaNamewithCinemaId;
             let ans=[];
            for(let i=0;i<list.length;i++)
            {
              for(let j=0;j<cinemasId.length;j++)
              {
                let Ids= Object.keys(list[i]);
                let names= Object.values(list[i]);
                let id=Ids[0],name=names[0];
                  if(Ids[0]==cinemasId[j])
                  {
                    ans.push(
                         {
                          "Id":Ids[0],
                          "name":names[0]
                         }
                      );
                  }
              }
            }
     //      console.log(result[0].CinemaNamewithCinemaId);
     //      console.log(cinemasId);
           res.send(ans);
          }   
      });

    }
});

  //  console.log("Inside Theatres ");
   // console.log(req.query);
});


app.get('/get_timing',(req,res)=>{
    
 // console.log(req.query.id);
  CinemaTiming.find({'CinemaId':req.query.id},(err,result)=> {
        if (err||result.length==0) 
         res.send(err);
        else
          res.send(result[0].timing);
       });
});

app.get('/bookTicket',(req,res)=>{
    
  console.log(req.query);

  ShowDetails.find({'title':req.query.title,'CinemaId':req.query.CinemaId,'format_date':req.query.format_date,
            'format_time':req.query.format_time},(err,result)=> {
    if (err||result.length==0) 
    {
      console.log(err);
      console.log(result);
     res.send(err);
    }
    else
    {
      console.log(result[0].Seat_Layout);
      res.send("BOOKED");
    }
   });


});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});