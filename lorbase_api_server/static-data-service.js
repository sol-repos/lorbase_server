const express = require('express');

exports.registerStaticDataService = function (app, db, RESSOURCES_PATH) {
    app.use('/ressources', express.static(RESSOURCES_PATH));

    app.get('/regions', (req, res) => {
        const sql = 'SELECT * FROM regions';
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        });
    });

    app.get('/keywords', (req, res) => {
        const sql = 'SELECT * FROM keywords';
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        });
    });

    app.get('/spellSpeeds', (req, res) => {
        const sql = 'SELECT * FROM spellSpeeds';
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        });
    });

    app.get('/rarities', (req, res) => {
        const sql = 'SELECT * FROM rarities';
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        });
    });

    app.get('/sets', (req, res) => {
        const sql = 'SELECT * FROM sets';
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        });
    });

    app.get('/formats', (req, res) => {
        const sql = 'SELECT * FROM formats';
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        });
    });
}