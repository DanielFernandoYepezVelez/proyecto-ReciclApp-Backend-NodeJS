const { Router } = require('express');
const router = Router();

const poolConnection = require('../../../lib/dbConnect');
const { tokenVerify } = require('../../../lib/helpers');

router.get('/listProducts', tokenVerify, async(req, res, next) => {
    const client_id = req.usuario.id;

    const productsDB = await poolConnection.query('SELECT collects.id, codigoBarra, typeMaterials.typeMaterial, quantity FROM collects INNER JOIN typeMaterials ON collects.typeMaterial_id = typeMaterials.id WHERE collects.client_id = ?', client_id);

    res.json({
        ok: true,
        productsDB
    });
});

module.exports = router;