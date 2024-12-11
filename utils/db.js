/* eslint-disable */
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Get MongoDB connection details from environment variables or use defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Create the connection URL
    const url = `mongodb://${host}:${port}/${database}`;
    this.db = null;


    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.error(`DB Connection Error: ${err}`);
        return;
      }
      this.db = client.db(database);
    });
  }

  // Method to check if Redis is alive (connected)
  isAlive() {
    return !!this.db;
  }
  async nbUsers() {
    if (!this.isAlive()) return 0;
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.isAlive()) return 0;

    return this.db.collection('files').countDocuments();
  }

}

// Create an instance of dbClient called dbClient
const dbClient = new DBClient();

export default dbClient;

