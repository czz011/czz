// 对购物车接口的封装

import {$post,$get,$put,$delete} from '../utils/request'

// 删除购物车
export const $shoppingcart_delete = async (params)=>{
  let ret = await $delete('shoppingcart/delete',params)
  return ret
}

// 添加购物车
export const $shoppingcart_add = async (params)=>{
  let ret = await $post('shoppingcart/add',params)
  return ret
}

// 更新购物车
export const $shoppingcart_update = async (params)=>{
  let ret = await $put('shoppingcart/update',params)
  return ret
}

// 获取单个购物车
export const $shoppingcart_one = async (params)=>{
  let ret = await $get('shoppingcart/one',params)
  return ret
}

// 获取用户的购物车
export const $shoppingcart_list = async (params)=>{
  let ret = await $get('shoppingcart/list',params)
  return ret
}