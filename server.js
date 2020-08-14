// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const requestIp = require('request-ip');
var ipMiddleware = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    next();
};
//As Connect Middleware
app.use(requestIp.mw())

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/api/whoami', (req, res) => {
    var ipadress = req.clientIp;
    var language = req.acceptsLanguages();
    var software = req.get('User-Agent');
    res.json({
        ipadress: ipadress,
        language: language[0],
        software: software
    });
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});