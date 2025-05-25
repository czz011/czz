<!-- 商品页 -->
<template>
  <div class="page">
    <!-- 分类 -->
    <div class="breadcrumb">
      <div class="content">
        <div class="nav">
          <div class="title">分类</div>
          <el-tabs type="card" class="tabs" v-model="activeName" @tab-change="tabChange">
            <el-tab-pane :label="item.category_name" :name="item.category_id" v-for="(item, index) in categorys"
              :key="item.category_id"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 分类end -->
    <!-- 商品列表 -->
    <div class="products">
      <Item v-for="item in products" :key="item.product_id" :item="item"></Item>
    </div>
    <!-- end商品列表 -->
     <!-- 分页 -->
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" 
                             v-model:current-page="pageIndex" :page-size="15" :total="total"
                             @current-change="loadProducts" />
      </div>
      <!-- end分页 -->
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
// 导入分类api方法
import { $category_all } from '../api/category'

// 导入列表项组件
import Item from '../components/Item.vue'
// 导入商品api方法
import { $product_search } from '../api/product'

// 搜索文本
const searchText = inject('searchText')
// 当前页码
const pageIndex = ref(1)
// 商品数组
const products = ref([])
// 总数量
const total = ref(0)
// 监听搜索文本
watch(searchText, () => {
  loadProducts()
})

// 加载商品方法
const loadProducts = async () => {
  let { data, count } = await $product_search({
    category_id: activeName.value,//分类
    product_name: searchText.value,//商品名称
    pageIndex: pageIndex.value,//页码
    pageSize: 15//每页数量
  })
  products.value = data
  total.value = count
}



// 当前分类
const activeName = ref(0)
// 所有分类的数组
const categorys = ref([])
// 加载所有分类方法
const loadCatetorys = async () => {
  categorys.value = await $category_all()
  categorys.value.unshift({
    category_id: 0,
    category_name: '全部'
  })
}

// 分类切换事件
const tabChange = () => {
  loadProducts()
}
onMounted(() => {
  // 加载所有分类
  loadCatetorys()
  // 加载商品
  loadProducts()
})
</script>

<style lang="scss" scoped>
.breadcrumb {
  background-color: #fff;
  .content {
    width: 1226px;
    margin: 0 auto;
    .el-breadcrumb {
      font-size: 16px;
    }
    .nav {
      margin-top: 15px;
      display: flex;
      align-items: center;
      .title {
        font-weight: bold;
        font-size: 16px;
        margin-right: 20px;
      }
      .tabs {
        flex: 1;
      }
      ::v-deep .el-tabs__header {
        margin: 0;
      }
    }
  }
}
.products {
  width: 1226px;
  margin: 0 auto;
  margin-top: 14px;
  display: grid;
  grid:300px / 234px 234px 234px 234px 234px;
  grid-gap: 14px;
}
.pagination {
  width: 1226px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>