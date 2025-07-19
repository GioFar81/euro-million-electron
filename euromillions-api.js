// euromillions-api.js
// This file handles the integration with the euromillions-api and probability calculations

const axios = require('axios');

// API base URL
const API_BASE_URL = 'https://euromillions.api.pedromealha.dev';

// Function to fetch all draws
async function getAllDraws() {
    try {
        const response = await axios.get(`${API_BASE_URL}/draws`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all draws:', error);
        throw error;
    }
}

// Function to fetch a specific draw by date
async function getDrawByDate(date) {
    try {
        const response = await axios.get(`${API_BASE_URL}/draws/${date}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching draw for date ${date}:`, error);
        throw error;
    }
}

// Function to fetch the latest draw
async function getLatestDraw() {
    try {
        const response = await axios.get(`${API_BASE_URL}/draws/latest`);
        return response.data;
    } catch (error) {
        console.error('Error fetching latest draw:', error);
        throw error;
    }
}

// Function to calculate frequency of numbers from historical data
function calculateNumberFrequency(draws) {
    // Initialize frequency counters
    const numberFrequency = {};
    const starFrequency = {};

    // Initialize all possible numbers and stars with zero frequency
    for (let i = 1; i <= 50; i++) {
        numberFrequency[i] = 0;
    }
    
    for (let i = 1; i <= 12; i++) {
        starFrequency[i] = 0;
    }

    // Count frequency of each number and star in the draws
    draws.forEach(draw => {
        // Count regular numbers
        draw.numbers.forEach(num => {
            numberFrequency[num]++;
        });
        
        // Count star numbers
        draw.stars.forEach(star => {
            starFrequency[star]++;
        });
    });

    return { numberFrequency, starFrequency };
}

// Function to get hot numbers (most frequently drawn)
function getHotNumbers(frequency, count, total) {
    // Convert frequency object to array of [number, frequency] pairs
    const frequencyArray = Object.entries(frequency).map(([num, freq]) => [parseInt(num), freq]);
    
    // Sort by frequency in descending order
    frequencyArray.sort((a, b) => b[1] - a[1]);
    
    // Return the top 'count' numbers
    return {
        numbers: frequencyArray.slice(0, count).map(pair => pair[0]),
        frequencies: frequencyArray.slice(0, count).map(pair => pair[1]),
        percentages: frequencyArray.slice(0, count).map(pair => ((pair[1] / total) * 100).toFixed(2))
    };
}

// Function to get cold numbers (least frequently drawn)
function getColdNumbers(frequency, count, total) {
    // Convert frequency object to array of [number, frequency] pairs
    const frequencyArray = Object.entries(frequency).map(([num, freq]) => [parseInt(num), freq]);
    
    // Sort by frequency in ascending order
    frequencyArray.sort((a, b) => a[1] - b[1]);
    
    // Return the bottom 'count' numbers
    return {
        numbers: frequencyArray.slice(0, count).map(pair => pair[0]),
        frequencies: frequencyArray.slice(0, count).map(pair => pair[1]),
        percentages: frequencyArray.slice(0, count).map(pair => ((pair[1] / total) * 100).toFixed(2))
    };
}

// Function to generate numbers based on probability (hot or cold)
function generateProbabilityBasedNumbers(useHot = true, draws) {
    // Calculate frequency of numbers from historical data
    const { numberFrequency, starFrequency } = calculateNumberFrequency(draws);
    
    // Total number of draws
    const totalDraws = draws.length;
    
    // Get hot or cold numbers and stars
    let selectedNumbers, selectedStars;
    
    if (useHot) {
        // Use hot numbers (most frequent)
        selectedNumbers = getHotNumbers(numberFrequency, 10, totalDraws);
        selectedStars = getHotNumbers(starFrequency, 5, totalDraws);
    } else {
        // Use cold numbers (least frequent)
        selectedNumbers = getColdNumbers(numberFrequency, 10, totalDraws);
        selectedStars = getColdNumbers(starFrequency, 5, totalDraws);
    }
    
    // Randomly select 5 numbers from the pool of hot/cold numbers
    const finalNumbers = [];
    const numberPool = [...selectedNumbers.numbers];
    
    while (finalNumbers.length < 5 && numberPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * numberPool.length);
        finalNumbers.push(numberPool[randomIndex]);
        numberPool.splice(randomIndex, 1);
    }
    
    // If we don't have enough numbers, fill the rest with random numbers
    while (finalNumbers.length < 5) {
        const randomNum = Math.floor(Math.random() * 50) + 1;
        if (!finalNumbers.includes(randomNum)) {
            finalNumbers.push(randomNum);
        }
    }
    
    // Randomly select 2 stars from the pool of hot/cold stars
    const finalStars = [];
    const starPool = [...selectedStars.numbers];
    
    while (finalStars.length < 2 && starPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * starPool.length);
        finalStars.push(starPool[randomIndex]);
        starPool.splice(randomIndex, 1);
    }
    
    // If we don't have enough stars, fill the rest with random stars
    while (finalStars.length < 2) {
        const randomStar = Math.floor(Math.random() * 12) + 1;
        if (!finalStars.includes(randomStar)) {
            finalStars.push(randomStar);
        }
    }
    
    // Sort the numbers and stars in ascending order
    finalNumbers.sort((a, b) => a - b);
    finalStars.sort((a, b) => a - b);
    
    return { numbers: finalNumbers, stars: finalStars };
}

// Function to get statistics about the numbers
function getNumberStatistics(draws) {
    // Calculate frequency of numbers from historical data
    const { numberFrequency, starFrequency } = calculateNumberFrequency(draws);
    
    // Total number of draws
    const totalDraws = draws.length;
    
    // Get top 10 hot numbers and stars
    const hotNumbers = getHotNumbers(numberFrequency, 10, totalDraws);
    const hotStars = getHotNumbers(starFrequency, 5, totalDraws);
    
    // Get top 10 cold numbers and stars
    const coldNumbers = getColdNumbers(numberFrequency, 10, totalDraws);
    const coldStars = getColdNumbers(starFrequency, 5, totalDraws);
    
    return {
        totalDraws,
        hotNumbers,
        hotStars,
        coldNumbers,
        coldStars
    };
}

module.exports = {
    getAllDraws,
    getDrawByDate,
    getLatestDraw,
    calculateNumberFrequency,
    getHotNumbers,
    getColdNumbers,
    generateProbabilityBasedNumbers,
    getNumberStatistics
};
