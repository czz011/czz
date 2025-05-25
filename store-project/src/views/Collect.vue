<!-- 收藏页 -->
<template>
  <div class="page">
    <!-- 头部 -->
    <ContentHeader title="我的收藏"><CollectionTag/></ContentHeader>
     <!-- 头部end -->
    <!-- 内容 -->
    <div class="content">
      <div class="goods-list" v-if="collects.length>0">
        <Item v-for="(item,index) in collects" :key="index"
        :item="item" :close="true" @delete="deleteCollect"></Item>
      </div>
    </div>
    <!-- 内容end -->
  </div>
</template>

<script setup>
// 导入组合式api
import {ref,onMounted} from 'vue'
// 导入头部组件
import ContentHeader from '../components/ContentHeader.vue';
// 导入列表项组件
import Item from '../components/Item.vue';
// 导入图标
import { CollectionTag } from '@element-plus/icons-vue';
// 导入通知信息框
import { ElNotification } from 'element-plus';
// 导入收藏api
import { $collect_getUserCollect,$collect_deleteCollect } from '../api/collect';
// 导入全局用户状态Store
import useUser from '../store/useUser';

// 获取全局用户状态对象
const userStore = useUser()
// 收藏数据
const collects = ref([])

// 加载收藏列表
const loadCollects = async ()=>{
  let ret = await $collect_getUserCollect({user_id:userStore.user.user_id})
  collects.value = ret.data
}
// 删除收藏
const deleteCollect = async (e)=>{
  // 删除数量
  let ret = await $collect_deleteCollect({
    user_id:userStore.user.user_id,
    product_id:e
  })
  if(ret.success){
    ElNotification({
      title:'通知',
      message:ret.message,
      type:'success'
    })
    // 加载收藏列表
    loadCollects()
  }else{
    ElNotification({
      title:'通知',
      message:ret.message,
      type:'error'
    })
  }
}

// 组件挂载事件
onMounted(()=>{
  // 加载收藏列表
  loadCollects()
})

</script>

<style lang="scss" scoped>
.content{
  width: 1226px;
  margin: 0 auto;
  background-color: #f5f5f5;
  .goods-list{
    display: grid;
    grid:300px / 234px  234px 234px 234px 234px;
    grid-gap: 14px;
  }
}
</style>