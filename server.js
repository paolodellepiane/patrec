const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser'),
  routes = require('./api/patrec-routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);
app.listen(port);

console.log('patrec RESTful API server started on: ' + port);
