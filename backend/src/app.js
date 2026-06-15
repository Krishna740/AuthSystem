import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import env from './config/env.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import ApiError from './utils/ApiError.js';

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", env.clientUrl],
      },
    },
  })
);
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '10kb' }));

app.use('/api', routes);

app.use((_req, _res, next) => next(new ApiError(404, 'Route not found')));
app.use(errorHandler);

export default app;
