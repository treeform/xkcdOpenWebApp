var http = require('http');
var url = require('url');

http.createServer(function(request, response1) {
  
  params = url.parse(request.url, true)

  console.log(params, params.query.callback)

  var http = require('http');
  var options = {
      host: 'xkcd.com',
      port: 80,
      path: params.pathname
    };
  var req = http.get(options, function(response) {
    // handle the response
    var res_data = '';
    response.on('data', function(chunk) {
      res_data += chunk;
    });
    response.on('end', function() {
      response1.writeHead(200, {"Content-Type": "application/json"});
      response1.write(params.query.callback)
      response1.write("(");
      response1.write(res_data);
      response1.write(");");
      response1.end();
    });
  });
  req.on('error', function(e) {
    console.log("Got error: " + e.message);
  });

/*
  http.get("http://xkcd.com/info.0.json", function(res) {
    console.log("Got response: " + res.statusCode);
    console.log(res)
    response.write(res.text)
    response.end()
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    response.write(res.text)
    response.end()
  });

  
  var proxy = http.createClient(80, request.headers['host'])
  var proxy_request = proxy.request(request.method, request.url, request.headers);
  proxy_request.addListener('response', function (proxy_response) {
    proxy_response.addListener('data', function(chunk) {
      response.write(chunk, 'binary');
    });
    proxy_response.addListener('end', function() {
      response.end();
    });
    response.writeHead(proxy_response.statusCode, proxy_response.headers);
  });
  request.addListener('data', function(chunk) {
    proxy_request.write(chunk, 'binary');
  });
  request.addListener('end', function() {
    proxy_request.end();
  });
  */

}).listen(8070);