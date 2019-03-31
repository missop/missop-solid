import { InversifyKoaServer } from 'inversify-koa-utils';
import "reflect-metadata";
import { buildProviderModule, Container } from './ioc/ioc';
import "./ioc/loader";
import co from 'co';
import * as render from 'koa-swig';
import { join } from 'path';
import * as serve from 'koa-static';
import errorHandler from './util/errorHandler';
import * as log4js from 'log4js';
import config from './config';

// 日志配置
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'src/server/logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');

const container = new Container();
// 如何加载资源
container.load(buildProviderModule());

let server = new InversifyKoaServer(container);

server.setConfig(app => {
    // 注入路由机制
    app.context.render = co.wrap(render({
        root: join(config.viewDir),
        autoescape: true,
        cache: config.cacheMode, // disable, set to false
        ext: 'html',
        varControls: ["[[", "]]"],
        writeBody: false
    }));
    // 静态资源
    app.use(serve(config.staticDir));
}).setErrorConfig(app => {
    // 容错
    errorHandler.error(app, logger);
});

let app = server.build();
app.listen(3000, () => {
    console.log('yd启动成功！');
});
