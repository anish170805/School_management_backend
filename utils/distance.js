import axios from 'axios';

function isValidCoordinate(lat, lon) {
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);
    
    if (isNaN(latNum) || isNaN(lonNum)) {
        return false;
    }
    
    return latNum >= -90 && latNum <= 90 && lonNum >= -180 && lonNum <= 180;
}

async function getDistance(lat1, lon1, lat2, lon2) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    if (!isValidCoordinate(lat1, lon1) || !isValidCoordinate(lat2, lon2)) {
        console.warn(`Invalid coordinates provided: (${lat1}, ${lon1}) to (${lat2}, ${lon2})`);
        return null;
    }

    const origins = `${lat1},${lon1}`;
    const destinations = `${lat2},${lon2}`;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== 'OK') {
            console.warn(`Google Maps API error: ${data.status}`);
            return null;
        }

        const element = data?.rows?.[0]?.elements?.[0];

        if (element?.status === 'OK') {
            return element.distance.value / 1000;
        } else {
            console.warn(`Google Maps API could not find distance. Status: ${element?.status}`);
            console.warn(`From: ${origins}, To: ${destinations}`);
            console.warn(`Full response: ${JSON.stringify(data)}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching distance from Google Maps API:', error.message);
        return null;
    }
}

export default getDistance;
