import axios from 'axios'
import {baseURL} from '../config'

// 初始化一个axios实例
var instance = axios.create({
  // 请求前缀
  baseURL,
  // 请求超时时间
  timeout: 20000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 将token存放到axios的请求头中
  // 因为服务器是根据请求头中的token去验证接口的访问权限的
  // 判断浏览器缓存中单是否有token信息
  if(sessionStorage.getItem('token')){
    config.headers['token'] = sessionStorage.getItem('token');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 定义get请求方法
export const $get = async (url,params)=>{
  let {data} = await instance.get(url,{params})
  return data
}
// 定义post请求方法
export const $post = async (url,params)=>{
  let {data} = await instance.post(url,params)
  return data
}
// 定义put请求方法
export const $put = async (url,params)=>{
  let {data} = await instance.put(url,params)
  return data
}
// 定义delete请求方法
export const $delete = async (url,params)=>{
  let {data} = await instance.delete(url,{params})
  return data
}

// 导出axios实例
export default instance