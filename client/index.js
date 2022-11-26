const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var http = require('http');
var methodOverride = require('method-override')
var fs = require('fs');
var path = require('path')

const app = express()
const port = 9615

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET ALL
app.get('', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('all-stations.html'));
});

// ALL STATIONS
app.get('/all-stations', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('all-stations.html'));
});

// GET
app.get('/search-clima', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('search-clima.html'));
});
// POST ALL
app.get('/insert-new-clima', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('insert-new-clima.html'));
});

app.listen(port, () => console.log(`Stations Frontend listening on port ${port}!`));


