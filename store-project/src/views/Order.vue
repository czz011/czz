<!-- 订单页 -->
<template>
  <div class="page">
    <!-- 头部 -->
    <ContentHeader title="我的订单"><List /></ContentHeader>
    <!-- 头部end -->
    <!-- 内容 -->
    <div class="content" v-for="(order,index) in orderList" :key="order.order_id">
      <ul>
        <li class="order">
          <span class="order_id">订单编号: {{order.order_id}}</span>
          <span class="order_time">订单时间: {{order.order_time}}</span>
        </li>
        <li class="content-header">
          <div class="pro-check">
          </div>
          <div class="pro-img"></div>
          <div class="pro-name">商品名称</div>
          <div class="pro-price">单价</div>
          <div class="pro-num">数量</div>
          <div class="pro-total">小计</div>
          <div class="pro-action"></div>
        </li>
        <li class="product-list" v-for="pro in order.products" :key="pro.id">
          <div class="pro-check">
          </div>
          <div class="pro-img">
            <img :src="baseURL+pro.product_picture" alt="">
          </div>
          <div class="pro-name">{{pro.product_name}}</div>
          <div class="pro-price">{{pro.product_price}}元</div>
          <div class="pro-num">{{pro.product_num}}</div>
          <div class="pro-total pro-total-in">{{pro.product_price*pro.product_num}}元</div>
          <div class="pro-action">

          </div>
        </li>
      </ul>
      <div class="cart-bar">
        <div class="cart-bar-left">
          <span class="cart-total">
            共 <span class="cart-total-num">{{order.products.length}}</span> 件商品
          </span>
        </div>
        <div class="cart-bar-right">
          <span>
            <span class="total-price-title">合计：</span>
            <span class="total-price">{{order.totalPrice}}元</span>
          </span>
        </div>
      </div>
      <div style="height: 20px; background-color: #f5f5f5;" v-if="index!==orderList.length-1"></div>
    </div>
    <!-- 内容end -->
  </div>
</template>

<script setup>
// 导入组合式api
import {onMounted,reactive} from 'vue'
// 导入图标
import { List } from '@element-plus/icons-vue'
// 导入头部组件
import ContentHeader from '../components/ContentHeader.vue'
// 导入订单api
import {$order_getUserOrder} from '../api/order'
// 导入Store
import useUser from '../store/useUser'
// 导入请求根路径
import {baseURL} from '../config/index'

// 获取登录用户全局状态
const userStore= useUser()
// 订单数组
let orderList = reactive([])
// 格式化时间方法
let formatTime = (time)=>{
  let date = new Date(time)
  let y = date.getFullYear()
  let m = date.getMonth()+1
  let d = date.getDate()
  let h = date.getHours()
  let mi = date.getMinutes()
  let s = date.getSeconds()
  return [y,m,d].map(r=>r>=10?r:'0'+r).join('-')+' '+[h,mi,s].map(r=>r>=10?r:'0'+r).join(':')
}
// 加载用户订单
const loadUserOrder = async ()=>{
  let {data} = await $order_getUserOrder({user_id:userStore.user.user_id})
  data.forEach(r=>{
    let index = orderList.findIndex((o)=>o.order_id===r.order_id)
    if(index!=-1){
      orderList[index].products.push(r)
      orderList[index].totalPrice += r.product_price*r.product_num
    }else{
      orderList.push({
        // 订单编号
        order_id:r.order_id,
        // 订单时间
        order_time:formatTime(r.order_time),
        // 订单数据
        products:[r],
        // 总价
        totalPrice: r.product_price*r.product_num
      })
    }
  })
}
// 页面挂载完成
onMounted(()=>{
  loadUserOrder()  // 加载用户订单
})
</script>

<style lang="scss" scoped>
.content{
  width: 1226px;
  margin: 0 auto;
  background-color: #fff;
  .order{
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    padding: 0 20px;
    border-bottom: 1px solid #ff6700;
    .order_id{
      color: #ff6700;
    }
  }
  .pro-check{
    width: 110px;
    text-align: center;
  }
  .pro-img{
    height: 85px;
    width: 120px;
    img{
      height: 80px;
      width: 80px;
    }
  }
  .pro-name{
    width: 380px;
  }
  .pro-price{
    width: 140px;
    padding-right: 18px;
    text-align: center;
  }
  .pro-num{
    width: 150px;
    text-align: center;
  }
  .pro-total{
    width: 200px;
    padding-right: 81px;
    text-align: right;
  }
  .pro-total-in{
    color: #ff6700;
  }
  .pro-action{
    width: 80px;
    text-align: center;
    &:hover{
      color: #ff6700;
    }
  }
  .content-header{
    height: 85px;
    padding-right: 26px;
    color: #424242;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #b0b0b0;
  }
  .product-list{
    height: 116px;
    padding: 15px 26px 15px 0;
    border-top: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
  }
  .cart-bar{
    width: 1226px;
    padding: 0 20px;
    border-top: 1px solid #ff6700;
    height: 60px;
    line-height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    
    .cart-bar-left{
      a{
        line-height: 50px;
        margin-left: 32px;
        color: #757575;
        &:hover{
          color: #ff6700;
        }
      }
      .sep{
        color: #eee;
        margin: 0 20px;
      }
      .cart-total{
        color: #757575;
        .cart-total-num{
          color: #ff6700;
        }
      }
    }
    .cart-bar-right{
      .total-price-title{
        color: #ff6700;
        font-size: 14px;
      }
      .total-price{
        color: #ff6700;
        font-size: 30px;
      }
      .btn-primary{
        cursor: pointer;
        border: none;
        float: right;
        width: 200px;
        height: 50px;
        text-align: center;
        font-size: 18px;
        margin-left: 50px;
        background: #ff6700;
        color: #fff;
      }
    }
  }
}
</style>