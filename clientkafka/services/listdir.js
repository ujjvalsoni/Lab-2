const fs = require('fs');

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log(msg.folder);

    let arr = [];
    let dir = [];
    let y = "";

    fs.readdirSync(msg.folder).forEach(file => {
        y = file.toString();
        if (fs.lstatSync(msg.folder + file).isDirectory()) {
        }
        else {
            arr.push(file);
        }
    });
    console.log("mali gayu!!");
    callback(null, arr);

}

exports.handle_request = handle_request;