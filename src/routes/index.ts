import express from 'express';
import kidRoutes from './kidRoutes';

class Router {
    kids = kidRoutes;

    listen = () => {
        const routes = express();
        routes.use('/kids', kidRoutes);
    }
};

export default Router;