import express from 'express';
import proverbRoter from './routes/proverbs.js';
import cors from 'cors';

const app = express();
const PORT = 3000;


app.use(cors())
app.use(express.json());
app.use('/api/proverbs', proverbRoter);

app.listen(PORT, ()=> console.log(`Server running at http://localhost:${PORT}`));