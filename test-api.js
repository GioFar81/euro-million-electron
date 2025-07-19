// test-api.js
// Simple script to test the Euromillions API

const axios = require('axios');

// API base URL
const API_BASE_URL = 'https://euromillions.api.pedromealha.dev';

// Function to test API connectivity
async function testApiConnectivity() {
    console.log('Testing API connectivity...');
    
    try {
        // Test the /draws endpoint
        console.log('Testing /draws endpoint...');
        const drawsResponse = await axios.get(`${API_BASE_URL}/draws`);
        console.log('Draws endpoint response status:', drawsResponse.status);
        console.log('Number of draws returned:', drawsResponse.data.length);
        console.log('First draw sample:', drawsResponse.data[0]);
        
        // Test the /draws/latest endpoint
        console.log('\nTesting /draws/latest endpoint...');
        const latestResponse = await axios.get(`${API_BASE_URL}/draws/latest`);
        console.log('Latest draw endpoint response status:', latestResponse.status);
        console.log('Latest draw data:', latestResponse.data);
        
        console.log('\nAPI test completed successfully!');
    } catch (error) {
        console.error('API test failed with error:', error);
        
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received. Request details:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
        }
    }
}

// Run the test
testApiConnectivity();
