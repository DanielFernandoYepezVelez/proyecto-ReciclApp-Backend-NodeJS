const { Router } = require('express');
const router = Router();

const poolConnection = require('../../../lib/dbConnect');
const { tokenVerify } = require('../../../lib/helpers');

router.get('/locations', tokenVerify, async(req, res, next) => {
    const locationsDB = await poolConnection.query('SELECT id, locationName FROM collectLocations');

    res.status(200).json({
        ok: true,
        locationsDB
    });
});

router.post('/date', tokenVerify, async(req, res, next) => {
    const { date, location_id } = req.body;

    const setDate = {
        client_id: req.usuario.id,
        dateSchedule: date,
        collectLocation_id: location_id,
    }

    await poolConnection.query('INSERT INTO appointments SET ?', [setDate]);

    res.status(200).json({
        ok: true
    });
});

router.post('/location', tokenVerify, async(req, res, next) => {
    const { location_id } = req.body;

    const setLocation = {
        client_id: req.usuario.id,
        collectLocation_id: location_id,
    }

    await poolConnection.query(`INSERT INTO appointments SET ?`, [setLocation]);

    res.status(200).json({
        ok: true,
        location_id
    });
});

module.exports = router;