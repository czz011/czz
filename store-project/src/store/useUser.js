// 登录用户信息

import { defineStore } from 'pinia'

// 创建一个store，用于管理登录用户信息
export default defineStore('user',{
  // 定义状态
  state:()=>{
    return {
      // 是否显示登录界面
      showLogin:false,
      // 用户信息
      user:{
        user_id: '', 
        userName: '', 
        userPhoneNumber: ''
      }
    }
  },
  actions:{
    // 修改登录界面的状态
    setShowLogin(val){
      this.showLogin = val
    },
    // 设置用户信息
    setUser(val){
      this.user = val
    },
    // 重置方法
    reset(){
      this.user = {
        user_id: '', 
        userName: '', 
        userPhoneNumber: ''
      }
    }
  }
})