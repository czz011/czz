// 对收藏接口的封装

import {$post,$get,$delete} from '../utils/request'

// 添加收藏
export const $collect_addCollect = async (params)=>{
  let ret = await $post('collect/addCollect',params)
  return ret
}

// 获取用户收藏
export const $collect_getUserCollect = async (params)=>{
  let ret = await $get('collect/getUserCollect',params)
  return ret
}

// 删除收藏
export const $collect_deleteCollect = async (params)=>{
  let ret = await $delete('collect/deleteCollect',params)
  return ret
}