var express = require('express');
var multer  = require('multer');
var fs  = require('fs');

var app = express();
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));

app.get('/', (req, res) => {
    res.render('index');
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage}).array('files', 12);
app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Something went wrong: " + err.message);
        }
        res.end("Upload completed.");
    });
})

app.listen(3000);
