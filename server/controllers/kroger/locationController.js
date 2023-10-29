const axios = require('axios');
const {
  getAccessToken,
} = require('../../services/kroger/refreshKrogerAccessToken');

const kroger_api_url = process.env.KROGER_API_URL;

const getLocations = async (req, res) => {
  const access_token = getAccessToken();
  try {
    const { data } = await axios.get(`${kroger_api_url}/locations`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      params: req.body,
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

async function getClosestKrogerLocations(accessToken, latitude, longitude, count = 3) {
  const BASE_URL = "https://api.kroger.com/v1/locations";
  const headers = {
      "Authorization": `Bearer ${accessToken}`
  };
  const params = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      chain: "KROGER",
      limit: count
  });

  try {
      const response = await fetch(`${BASE_URL}?${params}`, { headers: headers });
      
      if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data;
  } catch (error) {
      console.error("Error fetching Kroger locations:", error);
      return [];
  }
}

module.exports = { getLocations, getClosestKrogerLocations };

// Example usage:
// (async () => {
//     const accessToken = "YOUR_OBTAINED_ACCESS_TOKEN"; // Replace with the actual access token you obtain
//     const closestLocations = await getClosestKrogerLocations(accessToken, 40.7128, -74.0060); // For New York City
//     console.log(closestLocations);
// })();

