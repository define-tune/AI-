<template>
    <div class="auth-layout">
        <div class="left-section">
            <div class="content">
                <h2 class="title">心理AI助手</h2>
                <p class="text">每个深夜，每个焦虑的时刻，我们都在这里，不必独自承受，让心与心的连接温暖您的每一天</p>
                <div class="robot">
                    <el-image :src="imgUrl" alt="心理AI助手" style="width: 90px; height: 90px;"></el-image>
                </div>
            </div>
        </div>
        <div class="right-section">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>

const imgUrl = new URL('../assets/images/无毛猫.png', import.meta.url).href
</script>

<style lang="scss" scoped>
   .auth-layout {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100vh;
        .left-section {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            background: radial-gradient(
                circle at center,
                #fbc7e4 0%,
                #f48fb1 60%,
                #8b3a5a 100%
                );
            .content {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                height: 250px;
                .title {
                    font-size: 32px;
                    color: #fff;
                    font-weight: 600;
                }
                .text {
                    font-size: 20px;
                    color: #fff;
                    width: 480px;
                    text-align: center;
                }
            }
        }
        .right-section {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
        }
   }
</style>