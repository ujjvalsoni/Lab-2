var mongo = require("./mongo");
var mongoURL = "mongodb://localhost/user";

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL , function () {
        console.log("connected");
        var coll = mongo.collection('log');

        coll.insertOne({data: msg.data, username: msg.username}, function (err) {
            if(err){
                res.code = "400";
                console.log("Error in upload at the end");
                throw err
            }
            else {
                res.code = "200";
                console.log("Done upload at the end");
                callback(null, res);
            }

        });
    });
}


exports.handle_request = handle_request;