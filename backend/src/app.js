import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import env from './config/env.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import ApiError from './utils/ApiError.js';

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '10kb' }));

app.use('/api', routes);

app.use((_req, _res, next) => next(new ApiError(404, 'Route not found')));
app.use(errorHandler);

export default app;
