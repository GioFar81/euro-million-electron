// __tests__/euromillions-api.test.js
// Tests for the Euromillions API module

const axios = require('axios');
const euroApi = require('../euromillions-api');

// Mock axios to avoid actual API calls during testing
jest.mock('axios');

// Sample draw data for testing
const sampleDraws = [
  {
    date: '2023-01-03',
    numbers: [2, 8, 14, 34, 44],
    stars: [3, 11]
  },
  {
    date: '2023-01-06',
    numbers: [5, 12, 20, 26, 31],
    stars: [5, 11]
  },
  {
    date: '2023-01-10',
    numbers: [10, 17, 28, 44, 50],
    stars: [8, 12]
  }
];

describe('Euromillions API Module', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('API Fetch Functions', () => {
    test('getAllDraws should fetch all draws from the API', async () => {
      // Mock the axios.get response
      axios.get.mockResolvedValue({ data: sampleDraws });

      // Call the function
      const result = await euroApi.getAllDraws();

      // Verify axios was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith('https://euromillions.api.pedromealha.dev/draws');
      
      // Verify the result is what we expect
      expect(result).toEqual(sampleDraws);
      expect(result.length).toBe(3);
    });

    test('getDrawByDate should fetch a specific draw by date', async () => {
      // Mock the axios.get response
      const sampleDate = '2023-01-03';
      const sampleDraw = sampleDraws[0];
      axios.get.mockResolvedValue({ data: sampleDraw });

      // Call the function
      const result = await euroApi.getDrawByDate(sampleDate);

      // Verify axios was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(`https://euromillions.api.pedromealha.dev/draws/${sampleDate}`);
      
      // Verify the result is what we expect
      expect(result).toEqual(sampleDraw);
    });

    test('getLatestDraw should fetch the latest draw', async () => {
      // Mock the axios.get response
      const latestDraw = sampleDraws[2];
      axios.get.mockResolvedValue({ data: latestDraw });

      // Call the function
      const result = await euroApi.getLatestDraw();

      // Verify axios was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith('https://euromillions.api.pedromealha.dev/draws/latest');
      
      // Verify the result is what we expect
      expect(result).toEqual(latestDraw);
    });

    test('API functions should handle errors properly', async () => {
      // Mock axios to throw an error
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValue(new Error(errorMessage));

      // Spy on console.error
      jest.spyOn(console, 'error').mockImplementation(() => {});

      // Call the function and expect it to throw
      await expect(euroApi.getAllDraws()).rejects.toThrow(errorMessage);
      
      // Verify console.error was called
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('Data Processing Functions', () => {
    test('calculateNumberFrequency should count occurrences of numbers and stars', () => {
      // Call the function
      const { numberFrequency, starFrequency } = euroApi.calculateNumberFrequency(sampleDraws);

      // Verify number frequencies
      expect(numberFrequency[2]).toBe(1);
      expect(numberFrequency[8]).toBe(1);
      expect(numberFrequency[44]).toBe(2); // Appears in two draws
      
      // Verify star frequencies
      expect(starFrequency[3]).toBe(1);
      expect(starFrequency[11]).toBe(2); // Appears in two draws
      expect(starFrequency[12]).toBe(1);
      
      // Verify all possible numbers and stars are initialized
      expect(Object.keys(numberFrequency).length).toBe(50);
      expect(Object.keys(starFrequency).length).toBe(12);
    });

    test('getHotNumbers should return most frequent numbers with stats', () => {
      // Create a frequency object with known values
      const numberFrequency = {};
      for (let i = 1; i <= 50; i++) {
        numberFrequency[i] = i; // Number i appears i times
      }
      
      // Call the function to get top 5 hot numbers
      const result = euroApi.getHotNumbers(numberFrequency, 5, 1275); // Sum of 1 to 50 = 1275
      
      // Verify the result
      expect(result.numbers).toEqual([50, 49, 48, 47, 46]); // Top 5 most frequent
      expect(result.frequencies).toEqual([50, 49, 48, 47, 46]); // Their frequencies
      
      // Check percentages (frequency / total * 100)
      expect(parseFloat(result.percentages[0])).toBeCloseTo((50 / 1275) * 100);
    });

    test('getColdNumbers should return least frequent numbers with stats', () => {
      // Create a frequency object with known values
      const numberFrequency = {};
      for (let i = 1; i <= 50; i++) {
        numberFrequency[i] = i; // Number i appears i times
      }
      
      // Call the function to get top 5 cold numbers
      const result = euroApi.getColdNumbers(numberFrequency, 5, 1275);
      
      // Verify the result
      expect(result.numbers).toEqual([1, 2, 3, 4, 5]); // Top 5 least frequent
      expect(result.frequencies).toEqual([1, 2, 3, 4, 5]); // Their frequencies
      
      // Check percentages (frequency / total * 100)
      expect(parseFloat(result.percentages[0])).toBeCloseTo((1 / 1275) * 100);
    });
  });

  describe('Number Generation Functions', () => {
    test('generateProbabilityBasedNumbers should generate valid numbers and stars', () => {
      // Call the function with hot numbers (useHot = true)
      const result = euroApi.generateProbabilityBasedNumbers(true, sampleDraws);
      
      // Verify the structure of the result
      expect(result).toHaveProperty('numbers');
      expect(result).toHaveProperty('stars');
      
      // Verify the counts
      expect(result.numbers.length).toBe(5);
      expect(result.stars.length).toBe(2);
      
      // Verify the ranges
      result.numbers.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(50);
      });
      
      result.stars.forEach(star => {
        expect(star).toBeGreaterThanOrEqual(1);
        expect(star).toBeLessThanOrEqual(12);
      });
      
      // Verify numbers and stars are sorted
      expect(result.numbers).toEqual([...result.numbers].sort((a, b) => a - b));
      expect(result.stars).toEqual([...result.stars].sort((a, b) => a - b));
    });

    test('getNumberStatistics should return comprehensive statistics', () => {
      // Call the function
      const stats = euroApi.getNumberStatistics(sampleDraws);
      
      // Verify the structure of the result
      expect(stats).toHaveProperty('totalDraws', 3);
      expect(stats).toHaveProperty('hotNumbers');
      expect(stats).toHaveProperty('hotStars');
      expect(stats).toHaveProperty('coldNumbers');
      expect(stats).toHaveProperty('coldStars');
      
      // Verify the hot numbers (should be the most frequent in our sample)
      expect(stats.hotNumbers.numbers).toContain(44); // Appears twice in our sample
      
      // Verify the hot stars (should be the most frequent in our sample)
      expect(stats.hotStars.numbers).toContain(11); // Appears twice in our sample
    });
  });
});
