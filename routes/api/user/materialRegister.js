const { Router } = require('express');
const router = Router();

const poolConnection = require('../../../lib/dbConnect');
const { tokenVerify } = require('../../../lib/helpers')

router.get('/typeMaterials', tokenVerify, async(req, res, next) => {
    const materials = await poolConnection.query('SELECT * FROM typeMaterials');
    res.json({ ok: true, materials });
});

router.post('/createMaterial', tokenVerify, async(req, res, next) => {
    const client_id = req.usuario.id
    const { codigoScanner, quantity, typeMaterial_id } = req.body;

    const registro = await poolConnection.query('SELECT * FROM appointments WHERE client_id = ?', client_id);
    const appointment_id = registro[0].id;

    const newMaterial = {
        codigoBarra: codigoScanner,
        quantity,
        client_id,
        typeMaterial_id,
        appointment_id
    }

    await poolConnection.query('INSERT INTO collects SET ?', [newMaterial]);

    res.json({
        ok: true,
        materialRegistered: newMaterial
    });
});

module.exports = router;