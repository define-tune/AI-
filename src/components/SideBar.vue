<template>
    <el-aside :width="isCollapse ? '64px' : '264px'">
        <el-menu
            :default-active="router.currentRoute.value.path.split('/')[2]"
            @open="handleOpen"
            @close="handleClose"
            class="menu-style"
            :collapse="isCollapse"
            :collapse-transition="false"
        >
            <div class="brand">
                <el-image style="width: 50px; height: 50px;" :src="iconUrl" alt="logo" :class="isCollapse ? 'logo-collapse' : 'logo-expand'"></el-image>
                <div v-show = !isCollapse class="info-card">
                    <h1 class="brand-title">心理健康AI助手</h1>
                    <p class="brand-subTitle">管理后台</p>
                </div>
            </div>
            <el-menu-item @click="selectMenu" v-for="item in router.options.routes[0].children" :index="item.path" >
                <el-icon><component :is="item.meta.icon"></component></el-icon>
                <span>{{ item.meta.title }}</span>
            </el-menu-item>

        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
import { ref ,computed, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/admin';
const adminStore = useAdminStore()
const router = useRouter();

const iconUrl = new URL('@/assets/images/机器人.png', import.meta.url).href

const isCollapse = computed(() => adminStore.isCollapse)

const activeIndex = ref('1');
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
    console.log(key, keyPath);
};

const selectMenu = (key) => {
    const currentRoute =  router.options.routes[0]
    router.push(`${currentRoute.path}/${key.index}`)
    
}

onMounted(() => {
    
})
</script>

<style lang="scss" scoped>

    .menu-style {
        height: 100%;
        overflow: hidden;
        .brand {
            display: flex;
            justify-content: space-between;
            padding: 0 30px;
            height: 60px;
            align-items: center;

            .logo-collapse {
                position: absolute;
                left: 10%;
            }
            .info-card {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .brand-title {
                    font-size: 20px;
                    font-weight:bold;
                    margin-bottom: 5px;
                    color: #1f2937;
                }
                .brand-subTitle {
                    font-size: 14px;
                    color: #6b7280;
                }
            }
        }
    }

</style>