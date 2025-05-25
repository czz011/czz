<!-- 商品详情页 -->
<template>
  <div class="page">
    <!-- 详情头部 -->
    <div class="detail-header">
      <div class="content">
        <div class="name">{{ product.product_name }}</div>
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>用户评价</li>
        </ul>
      </div>
    </div>
    <!-- 详情头部end -->
    <!-- 详情主体 -->
    <div class="detail-content">
      <!-- 轮播图 -->
      <div class="swiper">
        <swiper :list="product_imgs" width="560px" height="560px"></swiper>
      </div>
      <!-- 轮播图end -->
      <!-- 内容 -->
      <div class="content">
        <h1 class="name">{{ product.product_name }}</h1>
        <p class="intro">{{ product.product_intro }}</p>
        <p class="store">小米自营</p>
        <div class="price">
          <span>{{ product.product_selling_price }}元</span>
          <span class="del">{{ product.product_price }}元</span>
        </div>
        <!-- 价格详情 -->
        <div class="pro-list">
          <span class="pro-name">{{ product.product_name }}</span>
          <span class="pro-price">
            <span>{{ product.product_selling_price }}元</span>
            <span class="pro-del">{{ product.product_price }}元</span>
          </span>
          <p class="price-sum">总计：{{ product.product_selling_price }}元</p>
        </div>
        <!-- 价格详情end -->
        <!-- 操作按钮 -->
         <CartButton :product_id="product.product_id"></CartButton>
        <!-- 操作按钮end -->
        <ul class="pro-policy">
          <li><el-icon><CircleCheck /></el-icon>小米自营</li>
          <li><el-icon><CircleCheck /></el-icon>小米发货</li>
          <li><el-icon><CircleCheck /></el-icon>7天无理由退货</li>
          <li><el-icon><CircleCheck /></el-icon>7天价格保护</li>
        </ul>
      </div>
      <!-- 内容end -->
    </div>
    <!-- 详情主体end -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 导入商品api
import { $product_one, $product_getAllPicture } from '../api/product';

// 导入图标
import { CircleCheck } from '@element-plus/icons-vue';
// 轮播图组件
import Swiper from '../components/Swiper.vue'
// 购物车按钮组件
import CartButton from '../components/CartButton.vue';


// 创建路由
let route = useRoute()
// 商品
const product = ref({})
// 商品图片数组
const product_imgs = ref([])
// 加载商品的方法
const loadProduct = async () => {
  // 获取当前商品的id
  let product_id = route.query.id
  // 获取商品信息
  let { data } = await $product_one({ product_id })
  product.value = data
  // 获取商品图片信息
  let ret = await $product_getAllPicture({ product_id })
  product_imgs.value = ret.data.map((r => r.product_picture))
}
// 页面挂载
onMounted(() => {
  // 加载商品信息
  loadProduct()
})

</script>

<style lang="scss" scoped>
.page {
  background-color: #fff;
}

// 详情头部
.detail-header {
  box-shadow: 0 5px 5px rgb(0 0 0 / 7%);

  .content {
    height: 60px;
    width: 1226px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
      font-size: 18px;
      font-weight: 400;
      color: #212121;
    }

    ul {
      display: flex;

      li {
        font-size: 14px;
        color: #616161;
        margin-left: 20px;
        cursor: pointer;

        &:hover {
          color: #ff6700
        }
      }
    }
  }
}

// 详情主体
.detail-content {
  width: 1226px;
  margin: 0 auto;
  display: flex;
  padding-top: 30px;
  .swiper {
    width: 560px;
    height: 560px;
  }
  .content {
    margin-left: 25px;
    width: 640px;
  }

  // 内容
  .content {
    margin-left: 25px;
    width: 640px;
    .name {
      height: 30px;
      line-height: 30px;
      font-size: 24px;
      font-weight: 400;
      color: #212121;
    }
    .intro {
      color: #b0b0b0;
      padding-top: 10px;
    }
    .store {
      color: #ff6700;
      padding-top: 10px;
    }
    .price {
      display: block;
      font-size: 18px;
      color: #ff6700;
      border-bottom: 1px solid #e0e0e0;
      padding: 25px 0 25px;
      .del {
        font-size: 14px;
        margin-left: 10px;
        color: #b0b0b0;
        text-decoration: line-through;
      }
    }
    // 价格详情
    .pro-list {
      background: #f9f9f9;
      padding: 30px 60px;
      margin: 50px 0 50px;
      .pro-name {
        line-height: 30px;
        color: #616161;
      }
      .pro-price {
        float: right;
        span {
          line-height: 30px;
          color: #616161;
        }
        .pro-del {
          margin-left: 10px;
          text-decoration: line-through;
        }
      }
      .price-sum {
        color: #ff6700;
        font-size: 24px;
        padding-top: 20px;
      }
    }
    .pro-policy {
      display: flex;
      li {
        margin-right: 20px;
        color: #b0b0b0;
      }
    }
  }
}
</style>