const { makeApp } = require('./app');
const { connect } = require('./db');

async function main() {
  const app = makeApp();
  
  const connection = await connect();
  const connectionDb = await connection.getDb();
  console.log(`Connected to DB ${connectionDb.name}!`);

  app.listen(8080, () => {
    console.log('Server running on port 8080!');
  });
}

main().catch(err => {
  console.error(err);
});
