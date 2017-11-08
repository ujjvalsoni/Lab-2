var mongo = require("./mongo");
var mkdirp = require('mkdirp');
var mongoURL = "mongodb://localhost/user";

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function () {
        console.log("connected");
        var coll = mongo.collection('users');

        coll.findOne({email: msg.username, password : msg.password }, function (err, user) {
            if(user){
                res.code = "200";
                res.value = user;
                console.log(user);
                var dir = './uploads/' + user.fname;
                mkdirp(dir, function(err) {});
                console.log("true");
                callback(null, res);
            }

            else{
                res.code = "401";
                res.value = "Failed Login";
                callback(null, res);
            }
        });
    });
}


exports.handle_request = handle_request;