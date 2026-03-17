<template>
    <div class="navBar-wrapper">
        <div class="left">
            <el-icon @click="fold" size="16" class="icon-wrapper"><component :is='isFold? "Fold" : "Expand" '/></el-icon>
            <h1 class="navBar-title">{{ NavTitle}}</h1>
        </div>
        <div class="right">
            <el-dropdown @command="selectItem">
                <span class="el-dropdown-link">
                <img src="../assets/images/机器人.png" alt="avatar" width="30px">
                <text>admin</text>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="0">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { watchEffect, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/admin';
import { ElMessageBox , ElMessage} from 'element-plus';
import {
    logoutAPI
} from '@/apis/admin.js'
const adminStore = useAdminStore()
const route = useRoute();
const router = useRouter();
const NavTitle = ref('')
const isFold = ref(true)
watchEffect(() => {
    NavTitle.value = route.meta.title
})

const fold = () => {
    isFold.value = !isFold.value
    if(isFold.value) {
        adminStore.toggleCollapse()
        console.log(adminStore.isCollapse);
        return
    }
    adminStore.toggleCollapse()
    console.log(adminStore.isCollapse);
    
}

const selectItem = (e) => {
    if(e == 0) logout()
}

const logout = () =>  {
        ElMessageBox.confirm('确定退出登录吗？','提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            //确认退出登录
            logoutAPI().then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                ElMessage.success('退出登录')
                router.push('/auth')
            })
            
        }).catch(() => {
            //取消退出登录
        })
}

</script>

<style lang="scss" scoped>
    .navBar-wrapper {
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            min-width: 160px;
            .icon-wrapper {
                width: 35px;
                height: 25px;
                border: 1px solid rgb(216, 236, 239);
                border-radius: 5px;
                cursor: pointer;
                &:hover {
                    background-color: rgb(241, 242, 243);
                }
            }
            .navBar-title {
                font-size: 24px;
                padding-left: 20px;
                user-select: none;
            }
        }
        .right {
            display: flex;
            align-items: center;
            min-width: 120px;
            justify-content: end;
            :deep(.el-dropdown) {
                cursor: pointer;
                .el-dropdown-link {
                    display: flex;
                    align-items: center;
                    text {
                        padding: 0 5px;
                        font-weight: 600;
                    }
                }
            }
        }
    }
</style>