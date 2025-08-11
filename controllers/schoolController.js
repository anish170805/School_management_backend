import db from '../config/db.js';
import getDistance from '../utils/distance.js';

export const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({ error: 'Latitude and longitude must be valid numbers.' });
        }

        const query = `INSERT INTO schools (id, name, address, latitude, longitude) VALUES (${Date.now()},?, ?, ?, ?)`;
        const [results] = await db.query(query, [name, address, lat, lon]);

        res.status(201).json({ message: 'School added successfully', schoolId: results.insertId });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({ error: 'Invalid or missing latitude or longitude query parameters' });
        }

        const [results] = await db.query('SELECT * FROM schools');

        if (results.length === 0) {
            return res.json([]);
        }

        const schoolsWithDistance = await Promise.all(
            results.map(async (school) => {
                const distance = await getDistance(lat, lon, school.latitude, school.longitude);
                return { 
                    id: school.id,
                    name: school.name,
                    address: school.address,
                    latitude: school.latitude,
                    longitude: school.longitude,
                    distance: distance || 0
                };
            })
        );

        const sorted = schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(sorted);
    } catch (error) {
        console.error('Error fetching schools:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
