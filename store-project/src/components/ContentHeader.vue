<template>
    <div class="content-header">
        <div class="content">
            <p>
                <el-icon color="#ff6700" size="20">
                    <slot></slot>
                </el-icon>
                &nbsp;{{ props.title }}
            </p>
        </div>
    </div>
</template>

<script setup>
// 标题
const props = defineProps(["title"])
</script>

<style lang="scss" scoped>
.content-header {
    height: 64px;
    border-bottom: 2px solid #ff6700;
    background-color: #fff;
    margin-bottom: 20px;
    .content{
        width: 1226px;
        margin: 0 auto;
        display: flex;
        p{
            font-size: 28px;
            line-height: 58px;
            display: flex;
            align-items: center;
            font-weight: 400;
            color: #424242;
        }
    }
}
</style>