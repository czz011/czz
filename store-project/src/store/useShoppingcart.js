import { defineStore } from 'pinia'
import { $shoppingcart_list } from '../api/shoppingcart'
import useUser from './useUser'

// 购物车状态管理
export default defineStore('shoppingcart',{
  state:()=>{
    return {
      // 登录用户的购物车数组
      shoppingcartList:[]
    }
  },
  actions:{
    // 加载购物车信息
    async loadShoppingcartList(){
      let userStore = useUser()
      if(!userStore.user.user_id) return
      let {success,data} = await $shoppingcart_list({user_id:userStore.user.user_id})
      if(success){
        this.shoppingcartList = data.map(r=>{
          return {
            ...r,
            // 添加状态
            state:false
          }
        })
      }
    },
    // 获取单个购物车信息
    getShoppingcartOne(user_id,product_id){
      return this.shoppingcartList.find(r=>r.user_id===user_id && r.product_id===product_id)
    },
    // 删除本地购物车数据
    delShoppingCart(user_id,product_id){
      let index = this.shoppingcartList.findIndex(r=>r.user_id===user_id && r.product_id===product_id)
      this.shoppingcartList.splice(index,1)
    },
    // 清空购物车
    clear(){
      this.shoppingcartList = []
    }
  }
})