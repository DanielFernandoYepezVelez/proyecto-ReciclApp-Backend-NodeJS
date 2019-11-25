const { Router } = require('express');
const router = Router();

const poolConnection = require('../../../lib/dbConnect');

router.get('/users', async(req, res, next) => {
    const users = await poolConnection.query('SELECT * FROM users');
    res.json({ users });
});

module.exports = router;