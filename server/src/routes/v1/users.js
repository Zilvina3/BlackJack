const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require("../../config");

const router = express.Router();

router.get("/",  async (req, res) => {
    try {
        const con = await mysql.createConnection(dbConfig);
        const [ats] = await con.query(`SELECT * FROM users`)
        con.end();
        res.send(ats);
    } catch (error) {
        res.status(500).send({ error: error })
    }
});


router.get("/count",  async (req, res) => {
    try {
        const con = await mysql.createConnection(dbConfig);
        const [ats] = await con.query(`SELECT COUNT(userName) as count FROM users WHERE status = true`)
        con.end();
        res.send(ats);
    } catch (error) {
        res.status(500).send({ error: error })
    }
});

module.exports = router;