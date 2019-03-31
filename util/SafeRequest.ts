import { provide, TYPES } from '../ioc/ioc';
import * as fetch from 'node-fetch';
import { ISafeRequest } from '../interface/ISafeRequest';
@provide(TYPES.SafeRequest)
export default class SafeRequest implements ISafeRequest {
    public async fetch(url: string, arg?: Object, callback?: Function): Promise<Object> {
        let result = { "code": "error" };
        await fetch(url)
            .then(res => res.json())
            .then(json => (result = json));
        return result;
    }
}
