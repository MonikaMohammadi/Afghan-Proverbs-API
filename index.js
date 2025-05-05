import express from 'express';
import proverbRoter from './routes/proverbs.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/proverbs', proverbRoter);

app.listen(PORT, ()=> console.log(`Server running at http://localhost:${PORT}`));