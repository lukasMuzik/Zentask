import cors from 'cors';
import express from 'express';
import config from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import todoRoutes from './routes/todoRoutes';
import userRoutes from './routes/userRoutes';

import openApiDocument from './swagger/openApi.json';
import cookieParser from 'cookie-parser';

config.config({path: __dirname + '/.env'});

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(todoRoutes);
app.use(userRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((_, res) => {
  res.status(404).json({error: 'URL Not Found'});
});
