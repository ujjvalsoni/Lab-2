var mongo = require("./mongo");
var mongoURL = "mongodb://localhost/user";

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL , function () {
        console.log("connected");
        var coll = mongo.collection('log');
        console.log(msg.fname);

        coll.find({username: msg.fname}).toArray( function (err, users) {
            if(users){
                var x = users.length;
                var arr = [];
                for(var i =0; i<x; i++){
                    arr.push(users[i].data);
                }
                console.log(arr);
                callback(null, arr);
            }

            else{
                res.code = "401";
                res.value = "Failed";
                callback(null, res);
            }
        });
    });
}


exports.handle_request = handle_request;