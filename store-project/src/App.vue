<template>
  <div class="app">
    <!-- 头部 -->
    <div class="header">
      <div class="content">
        <ul>
          <el-popconfirm v-if="userStore.user.user_id" width="200px" title="确定退出登录吗？"
               confirm-button-text="确定"
               cancel-button-text="取消"
               @confirm="exit">
            <template #reference>
              <li >{{userStore.user.userName}}</li>
            </template>
          </el-popconfirm>
          <template v-else>
            <!-- 打开登录 -->
            <li @click="login">登录</li>
            <li>|</li>
            <!-- 打开注册 -->
            <li @click="register">注册</li>
          </template>
          <!-- 打开订单 -->
          <li @click="openOrder">我的订单</li>
          <!-- 打开收藏 -->
          <li @click="openCollect">我的收藏</li>
          <!-- 打开购物车 -->
          <li @click="openCart" class="shopcart" :class="{shopcart2:false}">
            <el-icon><ShoppingCartFull /></el-icon>
            <span>购物车({{shoppingcart_num}})</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- end头部 -->
    <!-- 导航 -->
    <div class="nav">
      <div class="content">
        <img src="./assets/logo.png"/>
        <!-- 菜单 -->
        <div class="menu">
          <el-menu :default-active="activeIndex" mode="horizontal" router>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/goods">全部商品</el-menu-item>
            <el-menu-item index="/about">关于我们</el-menu-item>
          </el-menu>
        </div>
        <!-- 搜索框 -->
        <div class="search">
          <el-input v-model="searchText" placeholder="请输入搜索内容">
            <template #append>
              <el-button :icon="Search"  @click="search"/>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <!-- end导航 -->
    <!-- 主体 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- end主体 -->
    <!-- 底部 -->
    <div class="footer">
      <div class="top">
        <a class="icon1" href="javascript:;">7天无理由退换货</a>
        <a class="icon2" href="javascript:;">满99元全场免邮</a>
        <a class="icon3" href="javascript:;">100%品质保证</a>
      </div>
      <div class="line"></div>
      <div class="bottom">
        <p>
          <a href="javascript:;">
            <img src="./assets/github.png"/>
          </a>
        </p>
        <p>
          <a href="javascript:;" @click="$router.push('/')">首页</a>
          <span>|</span>
          <a href="javascript:;" @click="$router.push('/goods')">全部商品</a>
          <span>|</span>
          <a href="javascript:;" @click="$router.push('/about')">关于我们</a>
        </p>
        <p>商城版权所有 © 2015-2025</p>
      </div>
    </div>
    <!-- end底部 -->
    <!-- 2.使用注册组件  4.通过ref属性绑定ref对象 -->
    <Register ref="registerRef"></Register>
    <!-- 使用登录组件  通过ref属性绑定ref对象-->
    <Login ref="loginRef"></Login>
  </div>
</template>

<script setup>
// 导入组合式API
import {ref,computed,watch,onMounted,watchEffect,provide} from 'vue'
// 导入路由器 和 当前路由
import {useRouter,useRoute} from 'vue-router'
// 导入图标
import {ShoppingCartFull,Search} from '@element-plus/icons-vue'
// 导入高度菜单状态
import useMenuActive from './store/useMenuActive';

// 导入全局状态存储库
import useUser from './store/useUser'
import useShoppingcart from './store/useShoppingcart'

// 1.导入注册组件
import Register from './components/Register.vue'
// 导入登录组件
import Login from './components/Login.vue';

// 3.定义一个ref用于绑定注册组件
let registerRef = ref(null)
// 5.打开注册界面的方法
let register = ()=>{
  // 打开注册界面
  registerRef.value.showRegister = true
}

// 定义一个ref用于绑定登录组件
let loginRef = ref(null)
// 打开登录界面的方法
let login = ()=>{
  // 打开登录界面
  loginRef.value.showLogin = true
}

// 登录用户状态
const userStore = useUser()
// 购物车状态
const shoppingcartStore = useShoppingcart()

// 获取路由器
let router = useRouter()
// 获取当前路由
let route = useRoute()

// 高亮菜单状态
const menuActive = useMenuActive()

// 菜单高亮索引
const activeIndex = computed(()=>{
  return menuActive.activeIndex
})
// 监视路由地址的变化，更新高亮索引
watch(()=>route.path,(nval)=>{
  menuActive.setActiveIndex(nval)
},{
  // 立刻执行一次
  immediate:true
})

// 搜索内容
const searchText = ref('')
// 搜索内容设置为依赖数据
provide('searchText',searchText)
// 搜索按钮点击事件
const search = ()=>{
  router.push('/goods')
}

// App根组件挂载完成
onMounted(()=>{
  // 判断浏览器缓存中是否有user信息
  if(sessionStorage.getItem('user')){
    userStore.setUser(JSON.parse(sessionStorage.getItem('user')))
  }
})

// 退出方法
let exit = ()=>{
  // 清空浏览器缓存
  localStorage.clear()
  sessionStorage.clear()
  // 重置登录用户信息
  userStore.reset()
  // 重置购物车信息
  shoppingcartStore.clear()
  // 如果当前所在页面是：订单、收藏、购物车，需要跳转到首页
  if(['/order','/collect','/shoppingCart'].includes(route.path)){
    // 跳转到首页
    router.push('/')
  }
}

// 副作用
watchEffect(()=>{
  // 加载购物车信息
  shoppingcartStore.loadShoppingcartList()

})

// 购物车商品数量
const shoppingcart_num = computed(()=>{
  return shoppingcartStore.shoppingcartList.reduce((curr,prev)=>curr+prev.num,0)
})

// 打开订单
const openOrder = ()=>{
  // 判断用户是否登录
  if(!userStore.user.user_id){
    userStore.setShowLogin(true)
    return
  }
  router.push('/order')
}
// 打开收藏
const openCollect = ()=>{
  // 判断用户是否登录
  if(!userStore.user.user_id){
    userStore.setShowLogin(true)
    return
  }
  router.push('/collect')
}
// 打开购物车
const openCart = ()=>{
  // 判断用户是否登录
  if(!userStore.user.user_id){
    userStore.setShowLogin(true)
    return
  }
  router.push('/shoppingCart')
}

</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}
.app{
  font-size: 14px;
  width: 100%;
  // 头部样式
  .header{
    height: 40px;
    background-color: #3d3d3d;
    .content{
      width: 1226px;
      color: #b0b0b0;
      margin: 0 auto;
      display: flex;
      justify-content: flex-end;
      ul{
        height: 40px;
        display: flex;
        align-items: center;
        li{
          cursor: pointer;
          margin: 0 6px;
          &:hover{
            color: #fff;
          }
          // 购物车按钮默认样式
          &.shopcart{
            width: 120px;
            height: 40px;
            margin-left: 15px;
            background-color: #424242;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
              margin-left: 3px;
            }
            &:hover{
              color: #ff6700;
              background-color: #fff;
            }
          }
          // 购物车有商品信息时按钮样式
          &.shopcart2{
            background-color: #ff6700;
            color: #fff;
            &:hover{
              color: #ff6700;
              background-color: #fff;
            }
          }
        }
      }
    }
  }
  // 导航样式
  .nav{
    margin-top: 20px;
    .content{
      width: 1226px;
      margin: 0 auto;
      padding-bottom: 2px;
      border-bottom: 1px solid #b0b0b0;
      display: flex;
      align-items: center;
      .menu{
        flex: 1;
        margin-left: 100px;
        .el-menu--horizontal{
          border-bottom: none;
        }
      }
      .search{
        width: 300px;
      }
    }
  }
  // 主体样式
  .main{
    background-color: #f5f5f5;
    padding-bottom: 20px;
  }
  // 底部样式
  .footer{
    background-color: #2f2f2f;
    height: 335px;
    .top{
      width: 1226px;
      height: 145px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      a{
        width: 400px;
        height: 40px;
        color: #fff;
        font-size: 20px;
        background: url(./assets/bg.png) no-repeat;
        padding-left: 45px;
        line-height: 40px;
        &.icon1{
          background-position: 0 0;
        }
        &.icon2{
          background-position: 0 -40px;
          margin: 0 150px;
        }
        &.icon3{
          background-position: 0 -80px;
        }
      }
    }
    // 分割线样式
    .line{
      border-bottom:1px solid #3d3d3d;
    }
    .bottom{
      width: 1226px;
      color: #888888;
      margin: 0 auto;
      p{
        text-align: center;
        margin: 20px 0;
        a{
          color: #888888;
        }
        span{
          margin: 0 20px;
        }
      }
    }
  }
}
</style>
