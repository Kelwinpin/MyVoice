import express from 'express';
import kidRoutes from './kidRoutes.js';
class Router {
    constructor() {
        this.kids = kidRoutes;
        this.listen = () => {
            const routes = express();
            routes.use('/kids', kidRoutes);
        };
    }
}
;
export default Router;
