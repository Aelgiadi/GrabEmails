import cors from 'cors';
import express from 'express';
import sourceMapSupport from 'source-map-support';

import routes from './routes';
import middleware from './middleware';

if (process.env.NODE_ENV === 'development') {
  sourceMapSupport.install();
}

const app = express();

app.use(cors());

app.use(express.static('public'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());
app.use(middleware.bodyParser({ limit: '50mb' }));

app.use('/getInfo', routes.getInfo);
app.use('*', routes.render);

export default app;
