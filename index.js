import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import schoolRoutes from './routes/schoolRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', schoolRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});