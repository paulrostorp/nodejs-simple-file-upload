const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

var app = express();

app.use(require('morgan')('dev'));

var storage = multer.diskStorage({
  destination: function (req, _, callback) {
    var dir = path.join('./uploads', req.params.path);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: function (req, _, callback) {
    callback(null, req.params.fileName);
  }
});

var upload = multer({ storage: storage }).single("data")

app.put('/:namespace/:path/:fileName', function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Something went wrong: " + err.message);
    }
    res.status(201).end("Upload completed: " + req.params.path + "/" + req.params.fileName);
  });
})

app.get('/:path/:fileName', function (req, res) {
  const file = `${__dirname}/uploads/${req.params.path}/${req.params.fileName}`;
  res.download(file);
});

app.listen(3000, () => console.debug("Server running"));
