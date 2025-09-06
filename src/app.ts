import express from 'express';
import { db, type DB } from './db';
import router from './routes';
import { errorHandler } from './middleware/error-handler.middleware';
import cors from 'cors';
import { logger } from './middleware/logger.middleware';

interface Config {
  port: number;
  env: string;
}

interface App {
  config: Config;
  db: DB;
  run(): void;
}

const app: App = {
  config: { port: 3000, env: 'development' },
  db,
  run() {},
};

app.run = function () {
  // Create express app
  const expressApp = express();

  // Add middlewware
  expressApp.use(logger);
  expressApp.use(express.json());
  expressApp.use(errorHandler);
  expressApp.use(cors());

  // Routing
  expressApp.use(router);
  expressApp.get('/', (req, res) => {
    return res.json({
      greeting: 'Hello! Welcome to MindX Midterm Test API',
    });
  });

  // Listen
  expressApp.listen(this.config.port, () => {
    console.log(`Server is running on http://localhost:${this.config.port}`);
  });
};

export default app;
