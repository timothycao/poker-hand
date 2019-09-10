const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('scripts'));
app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.use('/api', require('./api'));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(
    `Listening at http://localhost:${PORT}`
  )
});
