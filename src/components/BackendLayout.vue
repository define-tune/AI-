<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <SideBar />
      <el-container>
        <el-header style="padding: 0 15px; background-color: #fff;">
          <NavBar />
        </el-header>
        <el-main style="padding: 0;">
          <router-view class="content-container"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import  SideBar from './SideBar.vue'
import NavBar from './NavBar.vue'
</script>

<style lang="scss" scoped>
.backend-layout {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    .main-container {
      height: 100%;
      .content-container {
        width: calc(100% - 30px);
        height: calc(100% - 20px);
        margin-top: 10px;
        margin-left: 10px;
        background-color: #fff;
        padding: 20px;
        margin-bottom: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
      }
    }
}
</style>