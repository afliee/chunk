import express from 'express';
import morgan from 'morgan';
import viewEngine from './config/viewEngine';
import route from './routes/home';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config view engine for an express application
viewEngine(app);
route(app);
app.use(morgan('combined'));
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
