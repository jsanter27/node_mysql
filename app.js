const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const indexRouter = require('./routes/index');

const PORT = 3000;

var app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(morgan('dev'));
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});