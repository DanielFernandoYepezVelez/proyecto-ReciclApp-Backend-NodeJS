require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();

/* Hace referencia a la conexion de la BD */
const poolConnection = require('../../../lib/dbConnect');
const { matchPassword } = require('../../../lib/helpers');

router.post('/loginUser', async(req, res, next) => {

    const { email, password } = req.body;
    let userDB, validPassword, token;
    const rowsDB = await poolConnection.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rowsDB.length > 0) {
        userDB = rowsDB[0];
        validPassword = await matchPassword(password, userDB.password);
    } else {
        return res.status(400).json({
            ok: false,
            error: 'Usuario No Existe En La DB'
        })
    }

    if (!validPassword) {
        return res.status(401).json({
            ok: false,
            error: 'Las Contraseñas No Coinciden'
        })
    } else {
        token = jwt.sign({
            usuarioDB: userDB,
        }, process.env.SECRETE_KEY, { expiresIn: 60 * 60 * 24 * 30 * 60 });
    }

    // console.log(userDB);
    res.json({
        ok: true,
        usuarioDB: userDB,
        token
    });
});

module.exports = router;