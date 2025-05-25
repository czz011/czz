<!-- 首页 -->
<template>
  <div class="page">
    <!-- 轮播图 -->
    <div class="swiper">
      <div class="content">
        <Swiper :list="carousel_list" width="1226px" height="460px"></Swiper>
      </div>
    </div>
    <!-- 轮播图end -->
    <!-- 商品分类 -->
    <Types :types="types1">
      <img class="img" src="../assets/product/phone.png" />
    </Types>
    <Types :types="types2">
      <img class="img" src="../assets/product/jd1.png" />
      <img class="img" src="../assets/product/jd2.png" />
    </Types>
    <Types :types="types3">
      <img class="img" src="../assets/product/pj1.png" />
      <img class="img" src="../assets/product/pj2.png" />
    </Types>
    <!-- end商品分类 -->
  </div>
</template>

<script setup>
import {onMounted,ref} from 'vue'
// 导入轮播图组件
import Swiper from '../components/Swiper.vue';
// 导入分类组件
import Types from '../components/Types.vue';
// 导入api方法
import {$carousel_list} from '../api/carousel'
import {$product_search} from '../api/product'

// 分类数据
const types1 = ref({}) // 手机
const types2 = ref({}) // 家店
const types3 = ref({}) // 配件

// 加载商品信息的方法
const loadProduct_list = async ()=>{
  // 获取手机数据
  let ret = await $product_search({
    category_id:1, //手机
    product_name:'',
    pageIndex:1,
    pageSize:7
  })
  types1.value = {
    title:"手机",
    datas:[
      {
        title:'手机',
        data:ret.data
      }
    ]
  }
  // 获取家电数据
  let ret2 = await $product_search({
    category_id:2, // 电视
    product_name:'',
    pageIndex:1,
    pageSize:7
  })
  let ret3 = await $product_search({
    category_id:3, // 空调
    product_name:'',
    pageIndex:1,
    pageSize:7
  })
  types2.value = {
    title:'家电',
    datas:[
      {
        title:'电视机',
        data:ret2.data
      },
      {
        title:'空调',
        data:ret3.data
      }
    ]
  }
  // 获取配件数据
  let ret4 = await $product_search({
    category_id:5, // 保护套
    product_name:'',
    pageIndex:1,
    pageSize:7
  })
  let ret5 = await $product_search({
    category_id:6, // 保护膜
    product_name:'',
    pageIndex:1,
    pageSize:7
  })
  let ret6 = await $product_search({
    category_id:7, // 充电器
    product_name:'',
    pageIndex:1,
    pageSize:7
  })
  types3.value = {
    title:'配件',
    datas:[
      {
        title:'保护套',
        data:ret4.data
      },
      {
        title:'保护膜',
        data:ret5.data
      },
      {
        title:'充电器',
        data:ret6.data
      }
    ]
  }
}

// 轮播图数据
const carousel_list = ref([])
// 加载轮播图数据的方法
const loadCarousel_list = async ()=>{
  let ret = await $carousel_list()
  carousel_list.value = ret.map(r=>r.imgPath)
}

onMounted(()=>{
  // 加载轮播图数据
  loadCarousel_list()
  // 加载商品列表数据
  loadProduct_list()
})
</script>

<style scoped lang="scss">
.swiper{
  background-color: #fff;
  .content{
    width: 1226px;
    margin: 0 auto;
  }
}
</style>