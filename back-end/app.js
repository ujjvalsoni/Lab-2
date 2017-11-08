var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);
var kafka = require('./routes/kafka/client');
const upload = require('express-fileupload');
var routes = require('./routes/index');
var users = require('./routes/users');
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);


var app = express();
let obj2 ,count, username;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());
app.use(upload());

app.use('/', routes);
app.use('/users', users);

app.get('/logininfo', (req,res) =>{

    //console.log(count);
    res.json({count: count});
});

app.get('/userinfo', (req,res) =>{

    console.log(obj2);
    res.json(obj2);
});


app.get('/logout', function(req,res) {
    console.log(req.session.user);
    req.session.destroy();
    count = 0;
    console.log('Session Destroyed');
    res.redirect("http://localhost:3000/#/");
});

app.post('/login1', function(req, res) {
    passport.authenticate('login', function(err, user) {
        //res.send(user);
        if(err) {
            res.redirect("http://localhost:3000");
        }

        else if(!user) {
            res.redirect("http://localhost:3000");
        }

        else {
            count = 1;
            req.session.user = user.username;
            delete user.code;
            console.log();

            obj2 = {
                fname: user.value.fname,
                lname: user.value.lname,
                age: user.value.age,
                DOB: user.value.DOB,
                gender: user.value.gender,
                email: user.value.email
            };
            username = user.value.fname;
            console.log("session initilized");

            res.redirect("http://localhost:3000/#/home");
        }
    })(req, res);
});

app.post('/users/add', (req,res) =>{


    kafka.make_request('login_topic',{
        "email":req.body.email,
        "password":req.body.password,
        "fname": req.body.fname,
        "lname": req.body.lname,
        "age": req.body.age,
        "DOB":req.body.DOB,
        "gender":req.body.gender,
        number: 3}, function(err,results){

        console.log('in result');
        //console.log("resukts");
        if(results.code == 200){
            res.redirect("http://localhost:3000/#/");

        }
        else {
            console.log("error");
        }

    });

});

app.get('/listfiles', function(req, res) {

    const testFolder = './uploads/' + username + '/';
    //const fs = require('fs');
    kafka.make_request('login_topic',{"folder": testFolder, number: 2}, function(err,results){

        console.log('in result');
        console.log("results");
        res.json(results);
    });

});


app.post('/upload',function(req,res){

    if (req.files.upfile) {
        var file = req.files.upfile,
            name = file.name,
            type = file.mimetype;
        var uploadpath = 'C:/Users/Ujjval/WebstormProjects/clientkafka/uploads/' + username + '/' + name;
        file.mv(uploadpath, function (err) {
            if (err) {
                console.log("File Upload Failed", name, err);
                res.send("Error Occured!")
            }
            else {
                console.log("File Uploaded", name);
                var x =  'You uploaded the file named: ' + name + "!!";
                kafka.make_request('login_topic',{data:x,username: username, number: 5}, function(err,results){

                    console.log('in result1');
                    console.log("results1");
                    if(results.code == 200){

                        console.log("Done upload in middle!");
                        res.redirect("http://localhost:3000/#/listfiles");
                    }
                    else {
                        console.log("failed upload in middle!");
                        res.redirect("http://localhost:3000/#/listfiles");
                    }

                });
            }
        });
    }
    else {
        res.send("No File selected !");
        res.end();
    }

});


app.get('/download/*', (req, res) => {

        var dirname = req.params[0];
        var file = 'C:/Users/Ujjval/WebstormProjects/clientkafka/uploads/' + username + '/' + dirname;

        var x =  'You downloaded this file =>: ' + dirname + "!!";
        kafka.make_request('login_topic',{data:x, username: username, number: 6}, function(err,results){


            console.log('in result');
            console.log("results");
            if(results.code == 200){

                console.log("Done delete in middle!");
                //res.redirect("http://localhost:3000/#/listfiles");
            }
            else {
                console.log("failed delete in middle!");
                //res.redirect("http://localhost:3000/#/listfiles");
            }

        });
        res.download(file);
});



app.get('/delete/*', (req, res) => {

        var dirname = req.params[0];
        var file = 'C:/Users/Ujjval/WebstormProjects/clientkafka/uploads/' + username + '/' + dirname;
        var x =  'You deleted the file named: ' + dirname + "!!";

        kafka.make_request('login_topic',{file: file, data: x, username: username, number: 4}, function(err,results){

        console.log('in result');
        console.log("results");
        if(results.code == 200)
        {

            console.log("Done download in middle!");
            res.redirect("http://localhost:3000/#/delete");
        }
        else
        {
            console.log("failed download in middle!");
            res.redirect("http://localhost:3000/#/delete");
        }

    });
});


app.get('/log', (req, res) => {

    kafka.make_request('login_topic',{fname: username, number: 7}, function(err,results){

        console.log('in result');
        console.log("results");
        if(results.code == 200)
        {

            console.log("Done log in middle!");
            res.json(results);
        }
        else
        {
            console.log("failed log in middle!");
            res.json(results);
        }

    });

});


app.post('/groups', (req, res) => {

    var groupname = req.body.grpname;
    //var groupname = "three";

    kafka.make_request('login_topic',{groupname: groupname, username: username, number: 8}, function(err,results){

        console.log('in result');
        console.log("results");
        if(results.code == 200)
        {
            console.log("Done groups in middle!");
            res.redirect("http://localhost:3000/#/groups");
        }
        else
        {
            console.log("failed groups in middle!");
            res.send("failed log in middle!");
        }

    });

});


app.get('/getgroups', (req, res) => {

    kafka.make_request('login_topic',{username: username, number: 9}, function(err,results){

        console.log('in result');
        console.log("results");
        res.json(results);

    });

});

app.post('/uploadgroups/*',function(req,res){

    var dirname = req.params[0];
    console.log(dirname);
    console.log(req.files.upfiles);
    if (req.files.upfiles) {
        var file = req.files.upfiles,
            name = file.name,
            type = file.mimetype;
        var uploadpath = 'C:/Users/Ujjval/WebstormProjects/clientkafka/uploads/groups/' + dirname + '/' + name;
        file.mv(uploadpath, function (err) {
            if (err) {
                console.log("File Upload Failed", name, err);
                res.send("Error Occured!")
            }
            else {
                console.log("File Uploaded", name);
                var x =  'You uploaded the file named: ' + name + "!!";
                kafka.make_request('login_topic',{data:x,username: username, number: 5}, function(err,results){

                    console.log('in result');
                    console.log("results");
                    if(results.code == 200){

                        console.log("Done upload in middle!");
                        res.redirect("http://localhost:3000/#/listfiles");
                    }
                    else {
                        console.log("failed upload in middle!");
                        res.redirect("http://localhost:3000/#/listfiles");
                    }

                });
            }
        });
    }
    else {
        res.send("No File selected !");
        res.end();
    }

});

app.post('/addmem/*', (req, res) => {

    var membername = req.body.memname;
    var grpname = req.params[0];
    //var groupname = "three";

    kafka.make_request('login_topic',{membername: membername, username: username, grpname: grpname, number: 10}, function(err,results){

        console.log('in result');
        console.log("results");
        if(results.code == 200)
        {
            console.log("Done add members in middle!");
            res.redirect("http://localhost:3000/#/groups");
        }
        else
        {
            console.log("failed add members in middle!");
            res.send("failed log in middle!");
        }

    });

});







app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/auth/google/callback',
    passport.authenticate('google'));


app.listen(5000, () =>{

    console.log("Server started on 5000");
});

module.exports = app;
