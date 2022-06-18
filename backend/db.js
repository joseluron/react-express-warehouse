const mongoose = require('mongoose');

async function connect() {
  const dbUrl = `mongodb://localhost:27017/${
    process.env.NODE_ENV === 'test' ? 'test-database' : 'warehouse'
  }`;

  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await mongoose.connection;

  async function getDb() {
    return db;
  }

  async function close() {
    await db.close();
  }

  return {
    getDb,
    close,
  };
}

module.exports = {
  connect,
};
