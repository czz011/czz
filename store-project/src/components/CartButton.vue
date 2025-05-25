<template>
        <div class="button">
          <el-button class="shop-cart" @click="addCart()">加入购物车</el-button>
          <el-button class="like" @click="addCollect()">喜欢</el-button>
        </div>
</template>

<script setup>
// 导入购物车api
import { $shoppingcart_add,$shoppingcart_update} from '../api/shoppingcart';
// 导入收藏api
import {$collect_addCollect} from '../api/collect'
// 导入通知信息框
import { ElNotification } from 'element-plus';

// 导入store
import useUser from '../store/useUser'
import useShoppingcart from '../store/useShoppingcart'
// 获取当前登录用户的状态
let userStore =useUser()
let shoppingcartStore = useShoppingcart()

// 定义属性
let {product_id} = defineProps(['product_id'])

// 加入购物车
const addCart = async () => {
// 判断用户是否登录
    if(!userStore.user.user_id){
      userStore.setShowLogin(true)
      return
    }
    // 根据用户编号和商品编号，从购物车中获取商品信息
    let shoppingcart = shoppingcartStore.getShoppingcartOne(userStore.user.user_id,product_id)
    // 判断当前商品是否已经存在购物车列表中
    if(shoppingcart){
      // 更新商品数量
      let {success,message} = await $shoppingcart_update({
        user_id:userStore.user.user_id,//用户id
        product_id,
        num:shoppingcart.num+1
      })
      if(success){
        ElNotification({
          title:'通知',
          message:'该商品已在购物车，数量+1',
          type:'success'
        })
        // 更新购物车信息
        shoppingcartStore.loadShoppingcartList()
      }
    }else{
      // 添加到购物车
      let {message,success} = await $shoppingcart_add({
        user_id:userStore.user.user_id,
        product_id
      })
      if(success){
        ElNotification({
          title:'通知',
          message,
          type:'success'
        })
        // 更新购物车信息
        shoppingcartStore.loadShoppingcartList()
      }else{
        ElNotification({
          title:'通知',
          message,
          type:'error'
        })
      }
    }
}
// 加入收藏
const addCollect = async () => {
  // 判断用户是否登录
  if(!userStore.user.user_id){
    userStore.setShowLogin(true)
    return
  }
  let {message,success} = await $collect_addCollect({
    user_id:userStore.user.user_id,//用户id
    product_id // 商品id
  })
  if(success){
    ElNotification({
      title:'通知',
      message,
      type:'success'
    })
  }else{
    ElNotification({
      title:'通知',
      message,
      type:'error'
    })
  }
}


</script>

<style lang="scss" scoped>
  // 操作按钮
  .button {
      height: 55px;
      margin: 10px 0 20px 0;
      display: flex;
      .el-button {
        height: 55px;
        font-size: 16px;
        color: #fff;
        border: none;
        text-align: center;
      }
      .shop-cart {
        width: 340px;
        background-color: #ff6700;
      }
      .like {
        width: 260px;
        margin-left: 40px;
        background-color: #b0b0b0;
      }
    }
</style>