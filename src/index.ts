import app from './app.js';

try {
  await app.db.connect();
  app.run();
} catch (e) {
  console.log('Error: ' + e);
  if (e instanceof Error) {
    console.log(e.stack);
  }
}
