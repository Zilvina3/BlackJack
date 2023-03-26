const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig, jwtSecret } = require("../../config");
const  { authCheck } = require('../../middlewares/auth')

const router = express.Router();

router.get('/', authCheck ,  async (req,res) => {

    try {
        const con = await mysql.createConnection(dbConfig);
        const [ats] = await con.query(`SELECT * FROM rooms`)
        con.end();
        res.send(ats);
    } catch (error) {
        res.status(500).send({ error: error })
    }

});

router.get('/roomsChat', authCheck ,  async (req,res) => {

    try {
        const con = await mysql.createConnection(dbConfig);
        const [ats] = await con.query(`SELECT * FROM roomsChat`)
        con.end();
        res.send(ats);
    } catch (error) {
        res.status(500).send({ error: error })
    }

})


module.exports = router;