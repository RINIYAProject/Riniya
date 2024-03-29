import express, { Request, Response } from 'express'
import http from 'http'
import session from 'express-session'
import { v4 } from 'uuid'
import path from 'path'
import Auth from './routes/Auth'
import Index from './routes/index'
import Dashboard from './routes/Dashboard'
import { DiscordAccount } from '@riniya.ts/database/Social/DiscordAccount'
import Shop from './routes/Shop'
import Passport from './passport'
import Riniya from '@riniya.ts'
import Admin from './routes/Admin'
import Profile from './routes/Profile'
import Server from './routes/Server'
import cookieParser from 'cookie-parser'

const app = express();


export interface CustomRequest extends Request {
  internal: string;
  token?: DiscordAccount;
}

export interface CustomResponse extends Response {
  internal?: string;
  token?: DiscordAccount;
}

export default class WebsiteServer {
  private server: http.Server
  private passport: Passport

  public constructor() {
    this.passport = new Passport()

    app.set('trust proxy', 1) // trust first proxy

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(session({
      secret: v4(),
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }))

    app.use(cookieParser(v4()))

    this.passport.init(app)

    app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      // @ts-ignore
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });

    this.server = http.createServer(app)

    new Index(app)
    new Profile(app)
    new Server(app)
    new Admin(app)
    new Dashboard(app)
    new Shop(app)
    new Auth(app)

    Riniya.instance.logger.info('The website is operational.')
  }

  public initServer() {
    this.server.listen(2443)
  }
}
