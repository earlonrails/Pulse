// var spec_helper = require('./specHelper.js');
var faye = require('faye'),
    PulseSubscriber = require('../lib/pulse/PulseSubscriber').PulseSubscriber,
    PulsePublisher  = require('../lib/pulse/PulsePublisher').PulsePublisher;

describe("Pulse Message Server", function() {
  describe("Pulse should queue requests from tyger hosts to be recorded into mongo and analyzed in real-time", function() {

    beforeEach(function() {
      client = new faye.Client('http://localhost:8000/faye');
    });

    it('should subscribe to the faye server and receive messages.', function() {
      var mySub = new PulseSubscriber(client);
      mySub.subscribe('/data/*', 'Some url path thingy');
    });

    it('should publish messages to the faye server.', function() {
      var myPub = new PulsePublisher(client);
      myPub.publish('/data', 'Some url path thingy');
      myPub.publish('/data/lololol', ' crazy url lllll ... Some url path thingy');
    });
  });
});