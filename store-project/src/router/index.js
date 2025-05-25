import {createRouter,createWebHistory} from 'vue-router'

// 页面加载进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 创建路由器
const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:'/',
      name:'home',
      component:()=>import('../views/Home.vue'),
      meta:{
        title:'首页'
      }
    },
    {
      path:'/home',
      //重定向
      redirect:'/'
    },
    {
      path:'/inde',
      redirect:'/'
    },
    {
      path:'/goods',
      name:'goods',
      component:()=>import('../views/Goods.vue'),
      meta:{
        title:'商品'
      }
    },
    {
      path:'/detail',
      name:'detail',
      component:()=>import('../views/Detail.vue'),
      meta:{
        title:'商品详情'
      }
    },
    {
      path:'/order',
      name:'order',
      component:()=>import('../views/Order.vue'),
      meta:{
        title:'订单'
      }
    },
    {
      path:'/shoppingCart',
      name:'shoppingCart',
      component:()=>import('../views/ShoppingCart.vue'),
      meta:{
        title:'购物车'
      }
    },
    {
      path:'/collect',
      name:'collect',
      component:()=>import('../views/Collect.vue'),
      meta:{
        title:'收藏'
      }
    },
    {
      path:'/about',
      name:'about',
      component:()=>import('../views/About.vue'),
      meta:{
        title:'关于我们'
      }
    },
    {
      path:'/:pathMatch(.*)*',
      name:'error',
      component:()=>import('../views/Error.vue'),
      meta:{
        title:'404'
      }
    }
  ]
})

// 路由前置守卫
router.beforeEach((to,from,next)=>{
  // 开启进度条
  NProgress.start()
  next()
})

// 路由后置守卫
router.afterEach((to,from)=>{
  // 关闭进度条
  NProgress.done()
  // 更新网页标题
  document.title = to.meta.title
})

// 导出路由器
export default router