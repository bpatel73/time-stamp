// index.js
// where your node app starts
console.log(new Date());
console.log(new Date('2015-12-25T00:00:00.000Z') - new Date('1970-01-01T00:00:00.000Z'));
console.log(new Date(1451001600000).toUTCString());
console.log(new Date('2015-12-25') - new Date('1970-01-01'));
console.log(new Date('1970-01-01') - new Date('1970-01-01'));

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  var epoch = new Date('1970-01-01');
  let date;
  if(!req.params.date){
    date = new Date();
  }else if(Number(req.params.date)){
    date = new Date(Number(req.params.date));
  }else{
    date = new Date(req.params.date);
  }
  var unix = date - epoch;
  
  console.log(unix, date);
  if(date.toString() === 'Invalid Date'){
    res.json({
      "error": "Invalid Date"
    });
  }else{
    res.json({
      "unix": unix,
      "utc": date.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
