var mongo = require("./mongo");
var mongoURL = "mongodb://localhost/user";
var mkdirp = require('mkdirp');

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL , function () {
        console.log("connected");
        var coll = mongo.collection('groups');

        coll.insertOne({groupname: msg.groupname, username : msg.username}, function (err, user) {

            res.code = "200";
            res.value = user;
            console.log(user.groupname);
            var dir = './uploads/groups/' + msg.groupname;
            mkdirp(dir, function(err) {console.log(err);});
            callback(null, res);

        });
        /*


      coll.updateOne(
            { groupname: msg.groupname },
            { $set: {username: "ujjval" }})
            .then(function(result) {
                console.log(result);
            })
        */
    });
}


exports.handle_request = handle_request;