require('dotenv').config();
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();

/* Hace referencia a la conexion de la BD */
const poolConnection = require('../../../lib/dbConnect');
const { encryptPassword } = require('../../../lib/helpers');

router.get('/typeDocuments', async(req, res, next) => {
    const documents = await poolConnection.query('SELECT * FROM documents');
    res.json({ documents });
});

router.get('/neighborhoods', async(req, res, next) => {
    const neighborhoods = await poolConnection.query('SELECT * FROM neighborhoods');
    res.json({ neighborhoods });
});

router.get('/houses', async(req, res, next) => {
    const houses = await poolConnection.query('SELECT * FROM houses');
    res.json({ houses });
});

router.post('/createUser', async(req, res, next) => {
    let {
        fullName,
        numberDocument,
        mobilePhone,
        email,
        password,
        addressHome,
        membersHome,
        document_id,
        neighborhood_id,
        house_id
    } = req.body;

    /* Este espacio es para realizar las validaciones de los datos
    antes de que entren o lleguen a la base de datos */

    const newUser = {
        fullName,
        numberDocument,
        mobilePhone,
        email,
        password,
        addressHome,
        membersHome,
        document_id,
        neighborhood_id,
        house_id,
    }

    /* Antes de guardar el usuario cifro la contraseña */
    newUser.password = await encryptPassword(password);

    /* Darle a la BD el objeto para que lo almacene, pero para eso debo traerme la conexion a la BD, a través de pool*/
    const registro = await poolConnection.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = registro.insertId;

    console.log(newUser);
    res.json({
        ok: true,
        userRegistered: newUser
    });
});

module.exports = router;