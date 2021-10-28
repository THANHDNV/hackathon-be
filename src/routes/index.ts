import { Router } from 'express';
import { Routes } from '@interfaces/routes'

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (req, res, next) => {
      try {
        res.sendStatus(200);
      } catch (error) {
        next(error);
      }
    });
  }
}

const routes: Routes[] = [new IndexRoute()]

export default routes