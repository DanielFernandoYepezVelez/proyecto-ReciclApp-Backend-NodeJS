const { Router } = require('express');
const router = Router();

const poolConnection = require('../../../lib/dbConnect');

router.get('/appointments', async(req, res, next) => {
    const appointments = await poolConnection.query('SELECT users.id, documents.typeDocument, numberDocument, fullName, email, addressHome, neighborhoods.neighborhood, typematerials.typeMaterial, collects.quantity FROM users INNER JOIN documents ON users.document_id = documents.id INNER JOIN neighborhoods ON neighborhoods.id = users.neighborhood_id INNER JOIN collects ON collects.client_id = users.id INNER JOIN typematerials ON collects.typeMaterial_id = typematerials.id ORDER BY users.id ASC');
    res.json({ appointments });
});

module.exports = router;