const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require("../../config");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const newUserSchema = Joi.object({
    userName: Joi.string().required().min(5).max(12),
    password: Joi.string().required().min(3).max(20),
    psw: Joi.string().required().min(3).max(20),
    email: Joi.string().required().min(5).max(30),
    status: Joi.number().max(1),
    money: Joi.number().required().max(1000),
    score: Joi.number()
});

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

router.post('/register', async (req, res) => {
    let newUser = req.body

    try {
        newUser = await newUserSchema.validateAsync(newUser);
    } catch (error) {
        if (error) {
            console.log({ error : error.details[0]})
            res.status(400).send({ error : error.details[0]});
            return;
        }

    }

    try {

        const hashPassword = bcrypt.hashSync(newUser.password);
        newUser.password = hashPassword;

        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query(`INSERT INTO users SET ? `, [newUser])
        console.log({
            added: true,
            newUser: newUser.userName
        })
        res.send({message : 'New user was added!'})
        res.end();
    }catch (error) {
        res.status(500).send({ error : error })
    }
})

module.exports = router;