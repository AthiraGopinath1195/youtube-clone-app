//  app.js
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.js');


//  defining the app
const app = express();

//  defining the port
const port = process.env.PORT || 8012;

//  defining middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


//  defining mongoose
mongoose.connect(db.url);

//  defining routes
require('./app/routes/index.js')(app);

//  defining port
app.listen(port);
//  console.log('Server is up on port ' + port)
