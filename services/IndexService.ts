import { IIndex } from '../interface/IIndex';
import { Model } from '../models/User';
import { provide, TAGS, TYPES, inject } from '../ioc/ioc';
@provide(TAGS.IndexService)
export class IndexService implements IIndex {
    private safeRequest;
    constructor(@inject(TYPES.SafeRequest) safeRequest) {
        this.safeRequest = safeRequest;
    }
    private userStorage: Model.User[] = [
        {
            email: 'yuanzhijia@jj.com',
            name: '老员'
        }, {
            email: 'yuanzhijia@jj.com',
            name: '老王'
        }
    ];
    public getUser(id: string): Model.User {
        let result: Model.User;
        result = this.userStorage[id];
        // console.log('得到的相应库'+this.safeRequest.fetch);
        // this.safeRequest.fetch('xxx.php', {}, function () {})
        return result;
    }
}