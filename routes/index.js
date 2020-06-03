const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mets',
    multipleStatements: true
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
    let player = [
        [null, req.body.lastName, req.body.firstName, req.body.position]
    ];

    const addPlayer = "INSERT INTO players ( id, lastName, firstName, position ) VALUES ?";
    connection.query(addPlayer, [player], (err, results) => {
        if (err)
            throw err;

        res.redirect('/');
    });
});

// REMOVE PLAYER FROM ROSTER
router.post('/remove', (req, res) => {
    let player = [req.body.lastName, req.body.firstName, req.body.position];

    console.log(player);
    const removePlayer = "DELETE FROM players WHERE lastName=? AND firstName=? AND position=?";
    connection.query(removePlayer, player, (err, results) => {
        if (err)
            throw err;

        res.redirect('/');
    });
})

module.exports = router;