const { Router } = require('express');
const router = Router();

const poolConnection = require('../../../lib/dbConnect');
const { tokenVerify } = require('../../../lib/helpers');

router.get('/infoUser', tokenVerify, async(req, res, next) => {
    const client_id = req.usuario.id;

    const infoUser = await poolConnection.query('SELECT users.id, fullName, documents.typeDocument, numberDocument, mobilePhone, email, neighborhoods.neighborhood, addressHome, houses.typeHouse FROM users INNER JOIN  documents ON users.document_id = documents.id INNER JOIN  neighborhoods ON users.neighborhood_id = neighborhoods.id INNER JOIN houses ON users.house_id = houses.id WHERE users.id = ?', client_id);
    const infoMaterial = await poolConnection.query('SELECT collects.id, codigoBarra, typematerials.typeMaterial, quantity FROM collects INNER JOIN users ON collects.client_id = users.id INNER JOIN typematerials ON collects.typeMaterial_id = typematerials.id INNER JOIN appointments ON collects.appointment_id = appointments.id WHERE users.id = ?', client_id);
    const infoDate = await poolConnection.query('SELECT appointments.id, dateSchedule FROM appointments INNER JOIN users ON appointments.client_id = users.id WHERE users.id = ?', client_id);
    const infoLocation = await poolConnection.query('SELECT appointments.id, collectlocations.locationName FROM appointments INNER JOIN collectlocations ON appointments.collectLocation_id = collectlocations.id INNER JOIN users ON appointments.client_id = users.id WHERE users.id = ?', client_id);    

    res.json({
        ok: true,
        infoUser,
        infoMaterial,
        infoDate,
        infoLocation
    });
});

module.exports = router;