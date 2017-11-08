var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
var listdir = require('./services/listdir');
var del = require('./services/delete');
var upload = require('./services/upload');
var download = require('./services/download');
var log = require('./services/log');
var groups = require('./services/groups');
var listgroups = require('./services/listgrp');
var addmem = require('./services/addmem');

var topic_name = 'login_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function (message) {
    //var x= 1;
    console.log('message received');
    var data = JSON.parse(message.value);
     var x =data.data.number;
    if(x === 1) {

        login.handle_request(data.data, function (err, res) {
            console.log('after handle ' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }

    if (x === 2){
        //var data = JSON.parse(message.value);
        listdir.handle_request(data.data, function(err,res){
            console.log('after handle '+ res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    }

    if(x === 3) {

        signup.handle_request(data.data, function (err, res) {
            console.log('after handle ' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }

    if(x === 4) {

        del.handle_request(data.data, function (err, res) {
            console.log('after handle ' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }

    if(x === 5) {

        upload.handle_request(data.data, function (err, res) {
            console.log('after handle ' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }

    if(x === 6) {

        download.handle_request(data.data, function (err, res) {
            console.log('after handle ' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }

    if(x === 7) {

        log.handle_request(data.data, function (err, res) {
            console.log('after handle ' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }

    if(x === 8) {

        groups.handle_request(data.data, function (err, res) {
            console.log('after handle ' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }
    if(x === 9) {

        listgroups.handle_request(data.data, function (err, res) {
            console.log('after handle ' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }

    if(x === 10) {

        addmem.handle_request(data.data, function (err, res) {
            console.log('after handle ' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    }
});

