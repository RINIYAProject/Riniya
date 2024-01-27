import express, { Request, Response } from 'express'
import Tuple from '@riniya.ts/utils/Tuple'
import AbstractRoutes from '../Server/AbstractRoutes'
import http from 'http'
import session from 'express-session'
import { v4 } from 'uuid'
import * as parser from 'body-parser'
import CAuthMiddleware from './middleware/CAuthMiddleware'
import path from 'path'
import Auth from './routes/Auth'
import Index from './routes/index'
import Dashboard from './routes/Dashboard'
import { DiscordAccount } from '@riniya.ts/database/Social/DiscordAccount'
import cookieParser from 'cookie-parser'
import Shop from './routes/Shop'
import Passport from './passport'
import Riniya from '@riniya.ts'
import Admin from './routes/Admin'
import Profile from './routes/Profile'
import Server from './routes/Server'

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

    app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      // @ts-ignore
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });

    this.passport.init(app)

    // Rotating secret if there is no secret set
    app.use(cookieParser(process.env.COOKIE_SECRET))

    this.server = http.createServer(app)
    app.use(parser.json())

    app.use(`/`, new Index().routing())
    app.use(`/auth`, new Auth().routing())
    app.use(`/profile`, new Profile().routing())
    app.use(`/servers`, new Server().routing())
    app.use(`/dashboard`, new Dashboard().routing())
    app.use(`/shop`, new Shop().routing())
    app.use(`/admin`, new Admin().routing())

    Riniya.instance.logger.info('The website is operational.')
  }

  public initServer() {
    this.server.listen(2443)
  }
}
