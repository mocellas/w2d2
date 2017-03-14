const http = require("http");
const port = 8080;

// a function which handles requests and sends response
function requestHandler(request, response) {
  if (request.url == "/") {
  response.end(`Requested Path: ${request.url}\nRequest Method: ${request.method}`);
  } else if (request.url == "/urls") {
    response.end("www.lighthouselabs.ca\nwww.google.com");
  } else {
    response.statusCode = 404;
    response.end("Unknown Path");
  }
  var server = http.createServer(requestHandler);
  server.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
}
