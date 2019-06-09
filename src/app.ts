import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import compression from 'compression';
import expressSession from 'express-session';
import { Client as pgClient } from 'pg';
import passport from 'passport';
import { Strategy } from 'passport-local';

import config from './config';
import { BaseRouter } from './routes/base';
import { AuthRouter } from './routes/auth';
import { ApiRouter } from './routes/api';

// 404 handler
function error404handler() {
  return (req:express.Request, res:express.Response) => {
    console.log(req.originalUrl);
    res.status(404).render('error', { code: 404, msg: 'Not Found' });
  };
}
class App {
  public app:express.Application;
  public db: pgClient;

  constructor() {
    this.app = express();
    this.db = new pgClient(config.db);
    this.passportInit();
    this.init();
    this.conndb();
  }
  private async init() {
    // package
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(process.cwd(), 'views'));
    this.app.use('/static', express.static('static'));
    this.app.use(morgan('common'));
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(expressSession({
      resave: false,
      saveUninitialized: false,
      secret: 'thisisadbmspro',
      cookie: { maxAge: 600000 },
    }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    // module
    this.app.use(BaseRouter);
    this.app.use(AuthRouter(passport));
    this.app.use(ApiRouter(this.db));
    this.app.use(error404handler());
  }

  private conndb() {
    this.db.connect((err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('connected');
      }
    });
  }

  private passportInit() {
    // passport init
    passport.serializeUser((user:any, callback:Function) => {
      callback(null, user.usid);
    });
    passport.deserializeUser((usid:any, done:any) => {
      const selectquery = {
        text: 'SELECT * FROM project.user WHERE usid=$1',
        values: [usid],
      };
      this.db.query(selectquery, (err, res) => {
        done(err, (res.rows[0] ? res.rows[0] : null));
      });
    });
    passport.use('admin', new Strategy(
      { usernameField: 'admin', passwordField: 'password' },
      (admin:string, password:string, done:any) => {
        const selectquery = {
          text: 'SELECT * FROM project.user WHERE email=$1 AND roleman=$2;',
          values: [admin, 'admin'],
        };
        this.db.query(selectquery, (err, res) => {
          if (err) return done(err);
          const admin = res.rows[0];
          if (!admin) return done(null, false);
          if (admin.passwd === password) return done(null, admin);
        });
      }));
  }
}

export default new App().app;
