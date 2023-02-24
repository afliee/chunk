import express from 'express';
import homeController from '../controllers/HomeController';
import hubController from '../controllers/HubController';
import apiController from '../controllers/ApiController';
const router = express.Router();

const initRoute = (app) => {
    router.get('/', homeController.index);
    router.get('/api/hub-home', hubController.index);
    router.get('/api', apiController.index);
    router.get('/favicon.ico', (req, res) => res.status(204));
    return app.use('/', router);
};

module.exports = initRoute;
