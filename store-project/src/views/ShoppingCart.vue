<!-- 购物车页 -->
<template>
  <div class="page">
    <!-- 头部 -->
    <ContentHeader title="我的购物车"><ShoppingCartFull/></ContentHeader>
    <!-- 头部end -->
    <!-- 主体 -->
     <div class="content">
      <ul>
        <!-- 购物车表头 -->
        <li class="content-header">
            <div class="pro-check">
              <el-checkbox v-model="ckAll" label="全选" size="large" />
            </div>
            <div class="pro-img"></div>
            <div class="pro-name">商品名称</div>
            <div class="pro-price">单价</div>
            <div class="pro-num">数量</div>
            <div class="pro-total">小计</div>
            <div class="pro-action">操作</div>
        </li>
        <!-- 购物车表头end -->
         <!-- 购物车列表 -->
          <li class="product-list" v-for="(pro,index) in shoppingcartStore.shoppingcartList" :key="pro.id">
            <div class="pro-check">
              <el-checkbox v-model="pro.state" label="" size="large" />
            </div>
            <div class="pro-img">
              <img :src="baseURL+pro.product_picture" alt=""/>
            </div>
              <div class="pro-name">{{pro.product_name}}</div>
              <div class="pro-price">{{ pro.product_selling_price }}元</div>
              <div class="pro-num">
                <el-input-number @change="(num)=>{changeNum(num,pro.product_id)}" v-model="pro.num" :min="1" :max="99" size="small" />
              </div>
              <div class="pro-total pro-total-in">{{ pro.product_selling_price * pro.num }}元</div>
              <div class="pro-action">
                <el-popconfirm width="150px" title="确定删除吗？"
                                confirm-button-text="确定"
                                cancel-button-text="取消"
                                @confirm="delShoppingCart(pro.user_id,pro.product_id)">
                  <template #reference>
                    <el-icon size="18"><CircleCloseFilled /></el-icon>
                  </template>
                </el-popconfirm>
              </div>
          </li>
          <!-- 购物车列表end -->
           <div style="height: 20px; background-color: #f5f5f5;"> </div>
           <!-- 购物车操作 -->
           <div class="cart-bar">
            <div class="cart-bar-left">
              <span>
                <router-link to="/goods"> 继续购物</router-link>
              </span>
              <span class="sep">|</span>
              <span class="cart-total">
                共 <span class="cart-total-num">{{ totalNum }}</span>件商品，已选择<span class="cart-total-num">{{ ckNum }}</span>件
              </span>
            </div>
            <div class="cart-bar-right">
              <span>
                <span class="total-price-title">合计：</span>
                <span class="total-price">{{ totalPrice }}元</span>
              </span>
              <el-popconfirm width="150px" title="确定购买吗？"
                              confirm-button-text="确定"
                              cancel-button-text="取消"
                              @confirm="buy">
                <template #reference>
                  <button class="btn-primary">去结算</button>
                </template>            
              </el-popconfirm>
            </div>
           </div>
            <!-- 购物车操作end -->
      </ul>
     </div>
     <div class="content">
      <img src="../assets/empty.png" style="width: 100%;" @click="$router.push('/goods')"/>
     </div>
    <!-- 主体end -->
  </div>
</template>

<script setup>
import { computed } from 'vue';

// 导入头部组件
import ContentHeader from '../components/ContentHeader.vue';
// 导入图标
import { CircleCloseFilled, ShoppingCartFull } from '@element-plus/icons-vue';

// 根路径
import {baseURL} from '../config/index'
// 导入购物车api
import {$shoppingcart_delete,$shoppingcart_update} from '../api/shoppingcart'
// 导入订单api
import {$order_addOrder} from '../api/order'

// 导入通知信息框
import { ElNotification } from 'element-plus';
// 导入sotre
import useUser from '../store/useUser'
import useShoppingcart from '../store/useShoppingcart'

// 获取购物车全局状态
let shoppingcartStore = useShoppingcart()
// 获取当前登录用户状态
let userStore = useUser()

// 总数量
let totalNum = computed(()=>{
  return shoppingcartStore.shoppingcartList.reduce((a,b)=>a+b.num,0)
})

// 选中数量
let ckNum = computed(()=>{
  return shoppingcartStore.shoppingcartList.filter(r=>r.state).reduce((a,b)=>a+b.num,0)
})

// 总价
let totalPrice = computed(()=>{
  return shoppingcartStore.shoppingcartList.filter(r=>r.state).reduce((a,b)=>a+b.product_selling_price*b.num,0)
})

// 全选
let ckAll = computed({
  //读 
  get(){
      return shoppingcartStore.shoppingcartList.every(r=>r.state)
  },
  set(val){
    shoppingcartStore.shoppingcartList.forEach(r=>r.state=val)
  }
})


// 删除购物车方法
let delShoppingCart = async(user_id,product_id)=>{
  // 先删除本地数据
  shoppingcartStore.delShoppingCart(user_id,product_id)
  //再删除远程数据
  let {message,success} =await $shoppingcart_delete({
    user_id,product_id
  })
  if(success){
    ElNotification({
      title:'通知',
      message,
      type:'success',
    })
  }else{
    ElNotification({
      title:'通知',
      message,
      type:'error',
    })
  }
}
// 监听到数据变化后，更新购物车数量
let changeNum = async (num,product_id)=>{
  await $shoppingcart_update({
    user_id:userStore.user.user_id,//用户id
    product_id,//商品id
    num //更新后的数量
  })
}
// 结算
let buy = async()=>{
  // 获取需要结算的商品数组
  let products = shoppingcartStore.shoppingcartList.filter(r=>r.state)
  // 判断是否有需要结算的商品
  if(products.length==0){
    ElNotification({
      title:'通知',
      message:'请选择需要结算的商品',
      type:'warning',
    })
    return
  }
  // 将购物车中选中的商品信息，添加到订单中
  let {success,message} = await $order_addOrder({
    user_id:userStore.user.user_id,//用户id
    products,//商品数组
  })
  if(success){
    ElNotification({
      title:'通知',
      message,
      type:'success',
    })
    // 重新加载购物车
    shoppingcartStore.loadShoppingcartList()
  }else{
    ElNotification({
      title:'通知',
      message,
      type:'error',
    })
  }
}

</script>

<style lang="scss" scoped>
.content{
  width: 1226px;
  margin: 0 auto;
  background-color: #fff;
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
  // 购物车表头
  .content-header{
    height: 85px;
    padding-right: 26px;
    color: #424242;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #b0b0b0;
  }

  // 购物车列表
  .product-list{
    height: 116px;
    padding: 15px 26px 15px 0;
    border-top: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
  }
  // 购物车操作
  .cart-bar{
    width: 1226px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    // 左侧样式
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
    // 右侧样式
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
        background:#ff6700;
        color: #fff;
      }
    }
  }
}
</style>