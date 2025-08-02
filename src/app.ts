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

const startups = [
  { id: 1, name: 'Startup A', description: 'Innovative tech solutions' },
  { id: 2, name: 'Startup B', description: 'Sustainable energy products' },
  { id: 3, name: 'Startup C', description: 'AI-driven healthcare' }
];

app.get('/', (req, res) => {
  res.json(startups);
});

export default app;