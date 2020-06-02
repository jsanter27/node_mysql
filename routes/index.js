const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mets'
});

connection.connect((err) => {
    if (err)
        throw err;
    console.log("Connected to MySQL server");
})

// GET THE ROSTER
router.get('/', (req, res) => {
    const getPlayers = "SELECT * FROM players";
    connection.query(getPlayers, (err, playerList) => {
        if (err)
            throw err;

        let players = [];
        playerList.forEach((player) => {
            let reformattedPlayer = {firstName: player.firstName, lastName: player.lastName, position: player.position};
            players.push(reformattedPlayer);
        });

        let data = {players: players};
        res.render('index', {data: data});
    });
});

// ADD PLAYER TO ROSTER
router.post('/add', (req, res) => {
    let player = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position
    }

    console.log(player);
    //input = [];
    //const addPlayer = mysql.format("INSERT INTO players ( id, lastName, firstName, position ) VALUES ?", input);
    res.render('index');
});

module.exports = router;