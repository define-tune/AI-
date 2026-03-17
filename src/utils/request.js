import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
    baseURL: '/api', // api的base_url     
    timeout: 5000 // 请求超时时间
})

//请求拦截器

service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if(token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

//响应拦截器
service.interceptors.response.use(
    (response) => {
        const {data, config} = response
        console.log(data);
        
        //处理业务错误
        // 兼容后端返回数字或字符串形式的 200
        if(data.code === '200' || data.code === 200) {
            // 正常返回业务数据
            return data?.data
        } 

        // 登录态失效或需要重新登录
        if(data.code === '-1' || data.code === -1) {
            if(!config.url?.includes('/login')) {
                // 便于排查：在控制台被清空前输出接口信息（也可在 Network 面板查看该请求的 Response）
                console.warn('[登录态/业务失败] 接口:', config.url, '返回:', data)
                ElMessage.error(data.msg || '登陆过期，请重新登录')

                //清除登录信息
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')

                window.location.href = '/auth/login'
            } else {
                ElMessage.error(data.msg || '登陆过期，请重新登录')
            }
            // 统一返回失败 Promise，避免 then 中拿到 undefined
            return Promise.reject(data)
        }

        // 其它业务码统一按失败处理
        ElMessage.error(data.msg || '请求失败，请稍后重试')
        return Promise.reject(data)
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service