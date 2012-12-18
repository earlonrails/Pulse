// var faye = require('faye');
// var client = new faye.Client('http://localhost:8000/faye');
// var myPub = new PulsePublisher(client);
// var b = new Pulse.PulsePublisher.PulsePublisher(client)
// myPub.publish('/agi', 'Some url path thingy');
// myPub.publish('/agi/lololol', ' crazy url lllll ... Some url path thingy');
// var faye = require('faye');
function PulsePublisher(client){
 // faye client
 this.client = client;
}
PulsePublisher.prototype.publish = function(channel, message){
  var publication = client.publish(channel, {mesage: message});
  publication.callback(function() {
    console.log('Message received by server!');
  });

  publication.errback(function(error) {
    console.log('There was a problem: ' + error.message);
  });
};

exports.PulsePublisher = PulsePublisher;