import Jsonp from 'jsonp';

export default class Axios {
    static jsonp(option) {
        return new Promise((res, rej) => {
            Jsonp(
                option.url,
                {param: 'callback'},
                (err, data) => {
                    if(data) {
                        res(data);
                    } else {
                        rej(err);
                    }
                }
            )
        })
    }
}