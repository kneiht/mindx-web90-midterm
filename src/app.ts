import express from 'express';
import { db, type DB } from './db';
import router from './routes';
import { errorHandler } from './middleware/error-handler.middleware';
import cors from 'cors';
import { logger } from './middleware/logger.middleware';
import path from 'path';
import { fileURLToPath } from 'url';

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
  expressApp.use(cors());

  // Routing
  expressApp.use(router);
  expressApp.get('/', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  // Error handler
  expressApp.use(errorHandler);

  // Listen
  expressApp.listen(this.config.port, () => {
    console.log(`Server is running on http://localhost:${this.config.port}`);
    console.log(
      `Thầy vào trang này có sẵn backend html đơn giản nhé: http://localhost:${this.config.port}`
    );
  });
};

export default app;
