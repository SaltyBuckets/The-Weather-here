var express = require('express');
var app = express();
var port = 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));
// app.use('/', (req, res) => { res.send("this is my webpage"); })
app.use(express.static('public'))
