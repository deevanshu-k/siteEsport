require('dotenv').config();
var express = require('express');
var app = express();
const Razorpay = require('razorpay');
var path = require('path');
var fs = require('fs');
const ejs = require("ejs");
var JSON = require('JSON');
var mysql = require('mysql');
var port = 80;

const razorpayInstance = new Razorpay({
   key_id: 'rzp_test_ixrVwfDieu9ywT',
   key_secret: 'BbWVhzD3FsYqKgxBdUKtke7a'
});


app.use('/static', express.static('static'));
app.use(express.urlencoded());



// Set the template engine as pug
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));











// database
var con = mysql.createConnection({
   host: "localhost",
   user: "deevanshu",
   password: "Deevanshu/125502",
   database: "tour_bgmi"
});
// var con = mysql.createConnection({
//    host: "localhost",
//    user: "deevanshu",
//    password: "Deevanshu/125502",
//    database: "tour_players"
// });

con.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
});
// con.connect(function (err) {
//    if (err) throw err;
//    console.log("Connected!");
// });













// network
app.get('/', (req, res) => {
   con.query("SELECT * FROM tour_details", function (err, result, fields) {
      if (err) throw err;
      data = result;
      console.log(data);
      res.status(200).render('upcomming', { data: data, host: process.env.HOST });
   });
});

app.get('/check_player', (req, res) => {
   const index = req.query.index;
   // console.log(index);
   con.query(`SELECT * FROM player_${index}s`, function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
      data = result;
      res.status(200).render('check_player', { data: data });
   });
});

app.get('/result', (req, res) => {
   let data;
   con.query("SELECT * FROM tour_details", function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
      data = result;
      res.status(200).render('result', { data: data, host: process.env.HOST });
   });
});

app.get("/check_result", async (req, res) => {
   const index = req.query.index;
   const type = req.query.type;
   const total_player = req.query.total_player;
   con.query(`SELECT * FROM player_${index}s order by kills desc`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      data = result;
      res.status(200).render('check_result', { data: data, type: type, total_player: total_player });
   });
});

app.get('/top_player', (req, res) => {
   con.query(`SELECT * FROM top_players`, function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
      data = result;
      res.status(200).render('top_player', { data: data, host: process.env.HOST });
   });
});












var server = app.listen(port, function () {
   // var port = server.address().port
   console.log("Example app listening at http://%s:%s/", process.env.HOST, port)
})