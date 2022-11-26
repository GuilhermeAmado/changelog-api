import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protectRoute } from './modules/auth';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', protectRoute, router);

export default app;
