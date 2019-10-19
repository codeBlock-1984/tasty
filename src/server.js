import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routers';
import responder from './middleware/responder';

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (env !== 'production') {
  app.use(morgan('tiny'));
}

app.use('/api/v1', router, responder);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Tasty API'
  });
});

app.get('/*', (req, res) => {
  res.status(404).json({
    message: 'Oops! Apparently this route does not exist'
  });
});

app.listen(port, () => {
  console.log(`Tasty server listening on port ${ port }`);
});

export default app;
