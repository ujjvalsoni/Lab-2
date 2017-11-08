var mongo = require("./mongo");
var mongoURL = "mongodb://localhost/user";

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL , function () {
        console.log("connected");
        var coll = mongo.collection('groups');
        console.log(msg.username);
        var arr = [];
        var y = 0;


        coll.find({username: msg.username}).toArray( function (err, users) {
            if(users){
                var x = users.length;
                y = x;

                for(var i =0; i<x; i++){
                    arr.push(users[i].groupname);
                }
                console.log(arr);
            }
        });

        coll.find({membername: msg.username}).toArray( function (err, users) {
            if(users){
                var x = users.length;
                var arr1 = [];
                for(var i=0; i<x; i++){
                    arr1.push(users[i].groupname);
                }
                console.log("new");
                console.log(arr1);
                arr.push(arr1);
                callback(null,arr);
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