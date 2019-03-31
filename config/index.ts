// const { join } = require('path');
import { join } from 'path';
import { extend } from "lodash";

let config = {
    "viewDir": join(__dirname, "..", "views"),
    "staticDir": join(__dirname, "..", "assets")
}
// console.log(config);

if (process.env.NODE_ENV == "development") {
    const localConfig = {
        baseURL: 'http://localhost:8080/?r=',
        cacheMode: false,
        port: 3000
    }
    config = extend(config, localConfig);
}
if (process.env.NODE_ENV == "production") {
    const prodConfig = {
        cacheMode: 'memory',
        port: 8081
    }
    config = extend(config, prodConfig);
}
export default config;