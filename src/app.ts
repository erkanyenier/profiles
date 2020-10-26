import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {indexProfileRouter} from './routes/index';
import {newProfileRouter} from './routes/new';
import {showProfileRouter} from './routes/show';
import {deleteProfileRouter} from './routes/delete';
import {updateProfileRouter} from './routes/update';


const app = express();
app.set('trust proxy', true);
app.use(cookieSession({
  signed: false,
  secure: false
  // secure: process.env.NODE_ENV !== 'test'
}));
app.use(json());


app.use(newProfileRouter);
app.use(showProfileRouter);
app.use(deleteProfileRouter);
app.use(indexProfileRouter);
app.use(updateProfileRouter);

app.all('*', async (req, res) => {
  console.log('HATAAAA');
  res.status(404).send({});
});

export { app };
