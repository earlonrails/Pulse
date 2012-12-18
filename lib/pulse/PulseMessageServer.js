// db.addUser("faye", "iAmFaye123")
var fs    = require('fs'),
    path  = require('path'),
    http  = require('http'),
    https = require('https'),
    faye = require('faye'),
    fayeRedis = require('faye-redis');

// faye.Logging.logLevel = 'debug';

var SHARED_DIR = path.dirname(__filename) + '/../../../shared',
    PUBLIC_DIR = SHARED_DIR + '/public',
    port       = process.argv[2] || '8000',
    secure     = process.argv[3] === 'ssl',
    bayeux     = new faye.NodeAdapter({ mount: '/faye',
                                        timeout: 20,
                                        engine: {
                                            type:   fayeRedis,
                                            host:   'localhost',
                                            port:   6379
                                        }
                                      })
    // sslOpts = {
    //   key:  fs.readFileSync(SHARED_DIR + '/server.key'),
    //   cert: fs.readFileSync(SHARED_DIR + '/server.crt')
    // };

var handleRequest = function(request, response) {
  var path = (request.url === '/') ? '/index.html' : request.url;

  fs.readFile(PUBLIC_DIR + path, function(err, content) {
    var status = err ? 404 : 200;
    response.writeHead(status, {'Content-Type': 'text/html'});
    response.write(content || 'Not Found');
    response.end();
  });
};

var server = secure ? https.createServer(sslOpts, handleRequest) : http.createServer(handleRequest);
bayeux.attach(server);
server.listen(Number(port));
console.log('Listening on ' + port + (secure ? ' (https)' : ''));

bayeux.bind('handshake', function(clientId) {
  console.log('[ HANDSHAKE ] ' + clientId);
});

bayeux.bind('subscribe', function(clientId, channel) {
  console.log('[ SUBSCRIBE ] ' + clientId + ' -> ' + channel);
});

bayeux.bind('unsubscribe', function(clientId, channel) {
  console.log('[ UNSUBSCRIBE ] ' + clientId + ' -> ' + channel);
});

bayeux.bind('publish', function(clientId, channel, data) {
  console.log('[ PUBLISH ] ' + clientId + ' -> ' + channel + ' -> ' + data);
});

bayeux.bind('disconnect', function(clientId) {
  console.log('[ DISCONNECT ] ' + clientId);
});

