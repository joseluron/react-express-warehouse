const { makeApp } = require('./app');

async function main() {
  const app = makeApp();

  app.listen(8080, () => {
    console.log('Server running on port 8080!');
  });
}

main().catch(err => {
  console.error(err);
});
