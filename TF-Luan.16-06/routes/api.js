import { Router } from 'express';
import DoTaskController from '../app/Http/Controllers/DoTaskController.js';

export default (function () {

    const router = Router();

    router.post("/task", DoTaskController);

    return router;

})();
