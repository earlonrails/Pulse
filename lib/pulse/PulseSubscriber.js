// var faye = require('faye');
// var client = new faye.Client('http://localhost:8000/faye');
// var a =  new Pulse.PulseSubscriber.PulseSubscriber(client, "tygerAdmin", "hotOrange$234");
// var mySub = new PulseSubscriber(client);
// mySub.subscribe('/agi/*', 'Some url path thingy');

var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

function PulseSubscriber(client, user, pass){
  this.client = client;
  this.user = user;
  this.pass = pass;
  this.server = new Server('localhost', 27017, { auto_reconnectg true });
  this.db = new Db('requests', this.server);
  this.channel = "";
}

PulseSubscriber.prototype = {

  subscribe : function(channel, collectionName, bubbleFunction){
    tSub = this;
    this.channel = channel;
    tSub.client.subscribe(channel, function(message) {
      if (collectionName){
        tSub.store(collectionName, message);
      }
      if (bubbleFunction){
        bubbleFunction(message);
      } else {
        eval(message);
      }
    });
  },

  store : function(collectionName, data){
    database = this.db
    user = this.user
    pass = this.pass
    channel  = this.channel;
    database.open(function(err, db){
      if(!err) {
        console.log("We are connected to mongo");
        database.authenticate(user, pass, function(err, result) {
          if(err) {
            console.log("Couldn\'t authenticate");
          } else {
            console.log("Storing to the database ...");
          }
          database.collection(collectionName, function(err, collection){
            /*
              data = { coords : { latitude : 20, longitude : 20 }, content : "some heading or something" }
            */
            doc = {
              "cameFrom"   : channel,
              "timeStamp"  : new Date(),
              "message"    : data
            };

            collection.insert(doc, function(){
              // callback
              database.close();
            });
          });
        });
      } else {
        console.log("Couldn\'t connect to mongo");
      }
    });
  }
};

exports.PulseSubscriber = PulseSubscriber;