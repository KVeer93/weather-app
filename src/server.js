const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL client setup
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'location_tracker',
    password: 'YCMI01@t',
    port: 5432,
});

client.connect();

app.use(bodyParser.json());

app.post('/save-location', (req, res) => {
    const { latitude, longitude, weather } = req.body;

    // Example of reverse geocoding to get physical address
    // You need to use a reverse geocoding API or service here to get the address
    // This is a placeholder, replace with actual reverse geocoding implementation
    const physicalAddress = "Placeholder Address";

    const query = `
        INSERT INTO location_data (latitude, longitude, address, weather)
        VALUES ($1, $2, $3, $4)
    `;
    const values = [latitude, longitude, physicalAddress, JSON.stringify(weather)];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ success: false, message: 'Error saving data' });
        } else {
            res.status(200).json({ success: true, message: 'Data saved successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
