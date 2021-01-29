import Jsonp from 'jsonp';
import axios from 'axios'
import { Modal } from 'antd'
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
    static ajax(option) {
        let loading = document.getElementById('ajaxLoading');
        if(option.data && option.data.params.isShowLoading) {
            loading.style.display = 'block';
        }
        return new Promise((resolve, reject) => {
            const baseURL = 'https://mock.mengxuegu.com/mock/6013ef7d29865558417100e6/mockapi';
            axios({
                url: option.url,
                method: 'get',
                baseURL: baseURL,
                params: (option.data && option.data.params) || '',
                timeout: 5000
            }).then(res => {
                loading.style.display = 'none';
                if(res.status === 200) {
                    if(res.data.code === 0) {
                        resolve(res.data)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.data.msg
                        })
                    }
                } else {
                    reject(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
}