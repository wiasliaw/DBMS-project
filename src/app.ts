import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import config from './config';
import { BaseRouter } from './routes/base';
import { ApiRouter } from './routes/api';
import admin from './libs/admin';

function error404handler() {
  return (req:express.Request, res:express.Response) => {
    console.log(req.originalUrl);
    res.status(404).render('error', { code: 404, msg: 'Not Found' });
  };
}

class App {
  public app:express.Application;
  private admin:admin;

  constructor() {
    this.app = express();
    this.admin = new admin(config.admin);
    this.admin.applyLink();
    this.init();
  }
  private init() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(process.cwd(), 'views'));
    this.app.use('/static', express.static('static'));
    this.app.use(morgan('common'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(BaseRouter);
    this.app.use(ApiRouter(this.admin));
    this.app.use(error404handler());
  }

}

export default new App().app;
