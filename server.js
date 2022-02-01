const express = require('express');
const fs = require('fs');
const path = require('path');

var app = express();

app.use(require('morgan')('dev'));

app.put('/:namespace/:path/:fileName', function (req, res, next) {
  var dir = path.join('./uploads', req.params.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  var file = fs.createWriteStream(path.join(dir, req.params.fileName));

  req.pipe(file).on("finish",()=>{

    res.status(201).end("Upload completed: " + req.params.path + "/" + req.params.fileName);
  }).on("error",(e)=>{
    res.status(500).send(e.message)
  })
})

app.get('/:path/:fileName', function (req, res) {
  const file = `${__dirname}/uploads/${req.params.path}/${req.params.fileName}`;
  res.download(file);
});

app.listen(3000, () => console.debug("Server running"));
