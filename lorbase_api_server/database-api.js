const sqlite3 = require('sqlite3').verbose();

const { registerDeckCodeService } = require('./deck-code-service');
const { registerStaticDataService } = require('./static-data-service');

exports.setupDatabaseApi = function(app, DB_PATH, RESSOURCES_PATH) {
    const db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
            console.error('Could not connect to database', err);
        } else {
            console.log('Connected to SQLite database');
        }
    });
    
    registerDeckCodeService(app, db);
    registerStaticDataService(app, db, RESSOURCES_PATH);
}