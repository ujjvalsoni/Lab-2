var mongo = require("./mongo");
var mongoURL = "mongodb://localhost/user";

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL , function () {
        console.log("connected");
        var coll = mongo.collection('users');

        coll.insertOne({email: msg.email, password : msg.password, fname: msg.fname, lname: msg.lname, age: msg.age, DOB: msg.DOB, gender: msg.gender}, function (err, user) {

                res.code = "200";
                res.value = user;
                console.log("true");
                callback(null, res);

        });
    });
}


exports.handle_request = handle_request;