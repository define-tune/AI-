<template>
    <div class="container">
        <div class="title">
            <div class="back-home" @click="backHome">
                <el-icon><Back /></el-icon>
                <span style="font-size: 16px;">返回首页</span>
            </div>
            <div class="title-text">
                <h2>登录您的账户</h2>
                <p>请输入您的登录信息</p>
            </div>
        </div>
        <div class="form-container">
            <el-form
                ref="formRef"
                :model="formData"
                :rules="rules"
                label-position="top"
            >
                <el-form-item label="用户名或邮箱" prop="username">
                    <el-input v-model="formData.username" size="large" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" type="password" show-password  size="large" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-button class="btn" size="large" type="primary" @click="submitForm(formRef)">登录账户</el-button>
            </el-form>
            <div class="footer">
                <p>还没有账户？<router-link to="/auth/register" style="color: blueviolet;">去注册</router-link></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login } from '@/apis/admin'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const formData = reactive({
    username: '',    // 用户名
    password: ''     // 密码    
})

const formRef = ref(null)

const rules = {
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'}
    ]
}

//登录
const submitForm = async (formEl) => {
    if(!formEl) return
    await formEl.validate((valid, fields) => {
    if (valid) {
        login(formData).then( data => {
            if(!data.token) {
                return console.error('登陆失败')
            }
            //登陆成功， 保存token和用户信息
            localStorage.setItem('token', data.token)
            localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
            //根据用户角色来判断跳转的路径
                ElMessage.success('登陆成功,马上跳转')
            setTimeout(() => {
                if(data.userInfo.userType === 2) {
                    router.push('/back')
                } else {
                    router.push('/')
                }
            },1500)
        })
        
    } else {
      console.log('登陆失败!', fields)
    }
  })
}

const backHome = () => {
    router.push('/')
}
</script>

<style lang="scss" scoped>
.container {
    width: 384px;
    .title {
        .back-home {
            margin-bottom: 60px;
            cursor:pointer;
            :hover {
               color : blue;
            }
        }
        .title-text {
            text-align: center;
            margin-bottom: 30px;
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
        .btn {
            margin-top: 40px;
            width: 100%;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
        }
    }
}
</style>