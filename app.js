const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// mongoose
 const userSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String,
   confirmPassword: String
 });


const User = mongoose.model("User", userSchema);


// ejs
app.set("view engine","ejs");

// for the info from the user
app.use(bodyParser.urlencoded({extended: true}));

// for external images and css
app.use(express.static("public"));

// mongoose-url-connect
mongoose.connect('mongodb://localhost:27017/carsDB', {useNewUrlParser: true});


app.get("/", function(req,res){
  res.render("index");
});

app.get("/about", function(req,res){
  res.render("about");
});

app.get("/cart", function(req, res){
  res.render("cart");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.post("/login", function(req, res){
  username = req.body.username;
  password = req.body.pwd;


  User.find(function(err, users){
    var flag = 0;
    var name;
    if(err){
      console.log(err);
    }
      else{
       for (var i = 0; i < users.length; i++) {
         if (users[i].email === username && users[i].password === password)
         {
           flag = 1;
           name = users[i].name;
           break;
         }
        }
         if(flag == 1){
           res.render("welcome-page", {
             name: name
           });
         }
         else{
           res.render("failed.ejs");
           console.log(username);
           console.log(password);
         }
         }
      });

});

app.get("/signup", function(req, res){
  res.render("signup");
});

app.post("/signup", function(req, res){
  var name = req.body.username;
  var email = req.body.email;
  var password = req.body.supwd;
  var confirmpass =  req.body.csupwd;
    if(password === confirmpass){
          const user = new User({
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmpass
        });

      user.save();

      res.render("welcome-page",{
        name: name
      });
    }
    else{
      res.render("signup");
    }

});




app.listen(3000, function(){
  console.log("This is America");
})
