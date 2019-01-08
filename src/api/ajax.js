//江哥 对axios进行进一步的封装
import axios from 'axios'

// 配置默认请求的根地址
axios.defaults.baseURL = 'http://10.211.55.6:3000';
// 配置超时时间...
axios.defaults.timeout = 5000;
// 请求之前的拦截
// 请求之后的拦截

export default {
  get(url = '', data = {}){
    return new Promise(function (resolve, reject) {
      axios.get(url, {
        params: data
      })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
    });
  },
  post(url = '', data = {}){
    return new Promise(function (resolve, reject) {
      axios.get(url, data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
}


//华哥方法


/* import axios from 'axios'
const BASE_URL = 'http://127.0.0.1:3000'
export default function ajax(urls='',params={},type='GET'){
 
  let promise;
  return new Promise((resolve,reject)=>{
      if(type === 'GET'){ //请求方式
        axios.get(url)
        let paramsStr = '';
          Object.keys(params).forEach(key=>{
            paramsStr += `${key}=${params[key]}&` 
            //paramsStr += key + '=' + params[key]+'&'
          })
          //过滤最后的&
          if(paramsStr !== ''){
            paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf('&'))
          }
          //完整路径
          url+='?'+paramsStr;
          //发送请求
          promise = axios.get(urls)
      }else{
        promise = axios.post(urls,params)
      }
       promise.then((res)=>{
          resolve(res.data)
      }).catch((err)=>{
          reject(err)
      })
  })
} */