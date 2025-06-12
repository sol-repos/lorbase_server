const express = require('express');
const cors = require('cors');
const { setupDatabaseApi } = require('./database-api-server/database-api.js');

const DB_PATH = '../lorbase.db';
const RESSOURCES_PATH = '../public_ressources';
const PORT = 3000;

const app = express();
app.use(cors());

setupDatabaseApi(app, DB_PATH, RESSOURCES_PATH);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});