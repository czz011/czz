<!-- 关于页 -->
<template>
  <div class="page">
    <div class="content">
      <div v-for="(item, index) in list" :key="index">{{ item }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const list = reactive(['公司简介','愿景及使命','发展历程','业务架构','管理团队','企业文化','办公地点','人才发展','工作环境'])
</script>

<style lang="scss" scoped>
.content {
  background: #fff;
  width: 1226px;
  margin: 0 auto;
  padding: 10px;
  display: grid;
  grid:260px 260px 260px / 392px 392px 392px;
  grid-gap: 14px;
  div{
    background-color: #eee;
    text-align: center;
    line-height: 260px;
    cursor: pointer;
    &:hover{
      background-color: #ddd;
    }
  }

}
</style>