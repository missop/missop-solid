import {
    controller, interfaces, httpGet, Router,
    TAGS, TYPE, provideThrowable
} from '../ioc/ioc';

// 1. Router.IRouterContext
// 2. interfaces.Controller
// 3. @inject(TAGS.IndexService) indexService
@controller("/test")
// toto
@provideThrowable(TYPE.Controller, "TestController")
export default class TestController implements interfaces.Controller {
    @httpGet("/page")
    private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        ctx.body = await ctx.render('index');
    }
}