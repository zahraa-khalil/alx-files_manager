const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    // Create a Redis client instance
    this.client = redis.createClient();

    this.getAsync = promisify(this.client.get).bind(this.client);
    // Event listener to handle errors
    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }
  // Method to check if Redis is alive (connected)
  isAlive() {
    return this.client.connected;
  }

  // Method to retrieve data from Redis
  async get(key) {
    return this.getAsync(key);
  }

  // Method to store data in Redis
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }


  async del(key) {
    return this.client.del(key);
  }
}

// Create an instance of RedisClient called redisClient
const redisClient = new RedisClient();

export default redisClient;