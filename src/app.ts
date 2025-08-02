import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import startupRoutes from './routes/startupRoutes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/startups', startupRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Startup Platform API');
});

export default app;