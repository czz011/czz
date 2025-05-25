<!-- 错误页 -->
<template>
  <div class="page">
    <div class="content">
        <img src="../assets/404.jpg" @click="$router.push('/')">
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.content{
  width: 1226px;
  margin: 0 auto;
  img{
    width: 100%;
  }
}
</style>