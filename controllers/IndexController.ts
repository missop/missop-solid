import {
    controller, interfaces, httpGet, Router,
    inject, TAGS, TYPE, provideThrowable
} from '../ioc/ioc';

// 1. Router.IRouterContext
// 2. interfaces.Controller
// 3. @inject(TAGS.IndexService) indexService
@controller("/")
// toto
@provideThrowable(TYPE.Controller, "IndexController")
export default class IndexController implements interfaces.Controller {
    private indexService;
    constructor(@inject(TAGS.IndexService) indexService) {
        this.indexService = indexService;
    }
    @httpGet("/")
    private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        const result = await this.indexService.getUser(1);
        ctx.body = result;
    }
}