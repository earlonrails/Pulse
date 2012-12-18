var Pulse = require('./lib/pulse');
var PulseSubscriber = Pulse.PulseSubscriber.PulseSubscriber;
var PulsePublisher = Pulse.PulsePublisher.PulsePublisher;
var faye = require('faye');
var client = new faye.Client('http://localhost:8000/faye');
var a =  new PulseSubscriber(client, "tygerAdmin", "hotOrange$234");
a.subscribe("/data/*", "agi_requests");
var b = new PulsePublisher(client);
b.publish('/data/call', { "location" : "ca", "cords" : [[1,2,3], [4,5,6], [7,8,9]] });