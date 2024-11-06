// server/server.js
const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoint to check if URL exists
app.get('/check-url', async (req, res) => {
  const { url, name } = req.query;

  // Check if the name indicates a Discord invite
  if (name === 'Discord') {
    const code = url.split('/').pop(); // Extract the invite code from the URL
 
    try {
      const response = await axios.get(`https://discord.com/api/v9/invites/${code}?with_counts=true&with_expiration=true`);

      if (response.status === 200) {
        return res.status(200).send({ exists: true });
      } else {
        return res.status(response.status).send({ exists: false });
      }
    } catch (error) {
      
      if (error.response) {
        if (error.response.status === 404 && error.response.data.code === 10006) {
          return res.status(200).send({ exists: false });
        }
      } else {
        console.error(`Request error: ${error.message}`);
        return res.status(500).send({ error: 'An unexpected error occurred' });
      }
    }
  }

  // If it's not a Discord link, proceed with the regular URL check
  try {
    const response = await axios.head(url);
    res.status(response.status).send({ exists: response.status === 200 });
  } catch (error) {
    res.status(404).send({ exists: false });
  }
});

// Set server to listen on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
