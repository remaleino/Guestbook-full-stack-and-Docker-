/*Asennetaan ja määritetään kaikki tatvittavat osat*/
var express = require('express');
var app = express();
const bodyParser = require("body-parser")
var json = require("./data/data.json");
const fs = require('fs');
const res = require('express/lib/response');
/*Jotta staattiset tiedostot (kuten css) toimisivat
ohjelmassa,
täsmenetään ohjelmalle kansio staattisten tiedostojen 
kansio*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
/* Ohjelman tarkastelukompponentin pitää ymmärtää, 
mitä tiedostoja sen on käsiteltävä sekä missä kyseiset tiedostot
sijaitsevat. Tätä varten on laadittut seuraavat rivit:
*/
app.set('views', './views');
app.set('view engine', 'ejs');

// Pääsivun lataaminen
app.get('/', function (req, res) {
    res.render('index');
});

// Vieraskirjan lataaminen
app.get('/guestbook', function (req, res) {
    const readJson = fs.readFileSync("./data/data.json");
    var data = JSON.parse(readJson);
    res.render('guestbook', { data: data });
});
//Viestin lähetys -sivun lataaminen
app.get('/newmessage', function (req, res) {
    res.render('newmessage', { data: json });
});
//Uuden viestin lisääminen JSON-tiedostoon
app.post('/newmessage', function (req, res) {
    const readJson = fs.readFileSync("./data/data.json");
    var data = JSON.parse(readJson);
    var { username, country, message } = req.body;
    const d = new Date()
    data.push({ id: (data.length + 1).toString(), username: username, country: country, date: d.toString(), message: message });
    fs.writeFileSync("./data/data.json", JSON.stringify(data, null, 4));
    res.redirect('/');
});
//AJAX-viestin-sivun lataaminen
app.get('/ajaxmessage', function (req, res) {
    res.render('ajaxmessage');
});
//Uuden ajax-viestin lisääminen ja tiedoston lähettäminen takas sivulle
app.get('/ajax', function (req, res) {
    const readJson = fs.readFileSync("./data/data.json");
    var data = JSON.parse(readJson);
    var line = req.query
    line["id"] = (data.length + 1).toString()
    data.push(line)
    fs.writeFileSync("./data/data.json", JSON.stringify(data, null, 4));
    res.send(data);
});
//Määritetään sovelluksen portiksi 8081 ja todetaan portin toiminvan.
app.listen(8081);
console.log('Server is listening on port 8081');