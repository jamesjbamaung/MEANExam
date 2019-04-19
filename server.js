const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

//telling express to grab our static files from the angular directory
app.use(express.static(__dirname + '/public/dist/public'));

// allows us to add error messages
const flash = require('express-flash');
app.use(flash())


app.listen(8000, function () {
    console.log('listening at port 8000');
})

require('./server/config/mongoose');
require('./server/config/routes')(app);