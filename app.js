var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;
if (process.env.ENV == 'test') {
    db = mongoose.connect('mongodb://localhost/earthdawn_test')
} else {
    db = mongoose.connect('mongodb://localhost/earthdawn');
} 

var Talent = require('./models/talentModel');
var Knack = require('./models/knackModel');
var Spell = require('./models/spellModel');
var Discipline = require('./models/disciplineModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

var talentRouter = require('./routes/routes.js')(Talent);
var knackRouter = require('./routes/knackRoutes.js')(Knack, Talent);
var spellRouter = require('./routes/routes.js')(Spell);
var disciplineRouter = require('./routes/disciplineRoutes.js')(Discipline, Talent);

app.use('/earthdawn/talents', talentRouter);
app.use('/earthdawn/knacks', knackRouter);
app.use('/earthdawn/spells', spellRouter);
app.use('/earthdawn/disciplines', disciplineRouter);

app.get('/', function (req, res) {
    var msg = {
        earthdawn: 'http://' + req.headers.host + '/earthdawn'
    }
    res.send(msg);
});

app.get('/earthdawn', function (req, res) {
    var msg = {
        title: 'welcome to the earthdawn api!',
        talents: 'http://' + req.headers.host + '/earthdawn/talents',
        knacks: 'http://' + req.headers.host + '/earthdawn/knacks',
        spells: 'http://' + req.headers.host + '/earthdawn/spells',
        disciplines: 'http://' + req.headers.host + '/earthdawn/disciplines'
    }
    res.send(msg);
});

app.listen(port, function () {
    console.log('gulp is running me on port: ' + port);
});

module.exports = app;