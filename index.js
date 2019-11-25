/* Conexion de la BD traida al index.js */
const { database } = require('./lib/dbConnect');
/* -------------------------------------------- */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* User Routes */
app.use('/api/registerUser', require('./routes/api/user/registerUser'));
app.use('/api/loginVerify', require('./routes/api/user/loginVerify'));
app.use('/api/schedule', require('./routes/api/user/schedule'));
app.use('/api/material', require('./routes/api/user/materialRegister'));
app.use('/api/product', require('./routes/api/user/products'));
app.use('/api/information', require('./routes/api/user/information'));

/* Admin Routes */
app.use('/api/getUser', require('./routes/api/admin/getUsers'));
app.use('/api/getAppointments', require('./routes/api/admin/getAppointments'));

app.listen(app.get('port'), () => {
    console.log(`Server On Port ${app.get('port')}`);
});