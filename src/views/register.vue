<template>
    <div class="container">
        <div class="title">
            <div class="title-text">
                <h2>创建您的用户</h2>
                <p>请填写注册信息</p>
            </div>
        </div>
        <div class="form-container">
            <el-form :model="formData" :rules="rules" ref="formRef" label-position="top">
                <el-form-item label="用户名或邮箱" prop="username">
                    <el-input v-model="formData.username" size="large" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" size="large" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="formData.nickname" size="large" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="formData.phone" size="large" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="formData.confirmPassword" size="large" placeholder="请再次确认密码" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" size="large" @click="submitForm(formRef)">注册</el-button>
                </el-form-item>
            </el-form>
            <div class="footer">
                <p>已有账户？<router-link to="/auth/login" style="color: blueviolet;">去登录</router-link></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
    registerAPI
} from '@/apis/frontend'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    email:'',
    nickname: '',
    phone: '',
    gender:0,
    userType: 1
})

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次确认密码', trigger: 'blur' }
    ]
})

const formRef = ref(null)

const submitForm = async(formEl) => {
    if(!formEl) return
    formEl.validate(async(valid) => {
        if(valid) {
            registerAPI(formData.value).then((data) => {
               ElMessage.success('注册成功')
               //注册成功后跳转到登录页
               router.push('/auth/login')
            })
        }
    })
}

</script>

<style lang="scss" scoped>
.container {
    width: 384px; 
    .flex-box {
        display: flex;
        align-items: center;
    }
    .title {
        .title-text {
            text-align: center;
            h2 {
                font-size: 36px;
                margin-bottom: 10px;
            }
            p {
                font-size: 18px;
                color: #6b7280;
            }
        }
    }
    .form-container {
        margin-top: 30px;
        .btn {
            margin-top: 40px;
            width: 100%;
        }
        .footer {
            padding: 30px;
            text-align: center;
        }
    }
}
</style>