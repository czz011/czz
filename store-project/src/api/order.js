// 对订单接口的封装

import {$post,$get} from '../utils/request'

// 添加订单
export const $order_addOrder = async (params)=>{
  let ret = await $post('order/addOrder',params)
  return ret
}

// 获取用户订单
export const $order_getUserOrder = async (params)=>{
  let ret = await $get('order/getUserOrder',params)
  return ret
}