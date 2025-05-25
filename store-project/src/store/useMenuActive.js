// 菜单高亮索引

import {defineStore} from 'pinia'

// 创建一个store，用于管理菜单高亮索引
export default defineStore('menuActive', {
  // 定义状态
  state:()=>{
    return {
      // 菜单高亮索引，从浏览器缓存中获取，默认值是:'/'
      activeIndex: sessionStorage.getItem('menuActive') || '/'
    }
  },
  // 操作状态的方法
  actions:{
    // 设置高亮索引
    setActiveIndex(val){
      // 在浏览器缓存中存储菜单高亮索引
      sessionStorage.setItem('menuActive',val)
      // 更新高亮索引
      this.activeIndex = val
    }
  }
})