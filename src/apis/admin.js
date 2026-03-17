import service from "../utils/request";

export const login = (data) => {
    return service.post('/user/login',data)
}

export const getCategoryListAPI = () => {
    return service.get('/knowledge/category/tree')
}

export const getAticlePageAPI = (params) => {
    return service({
        url: '/knowledge/article/page',
        method: 'get',
        params
    })
}

//上传文件
export const uploadFileAPI = (file, businessInfo) => {
    const formData = new FormData()
    formData.append('file',file)
    formData.append('businessType','ARTICLE')
    formData.append('businessId', businessInfo.businessId)
    formData.append('businessField', 'cover')

    return service.post('/file/upload',formData, {
        headers : {
            "Content-Type" : 'multipart/form-data'
        }
    })
}


export const createArticleAPI = (data) => {
    return service.post('/knowledge/article',data)
}

export const getAticleDetailAPI = (id) => {
    return service.get(`/knowledge/article/${id}`)
}

export const updateArticleAPI = (id,data) => {
    return service.put(`/knowledge/article/${id}`,data)
}

export const switchArticleStatusAPI = (id,data={}) => {
    return service.put(`/knowledge/article/${id}/status`,data)
}

export const deleteArticleAPI = (id) => {
    return service.delete(`/knowledge/article/${id}`)
}

export const getConsultationsAPI = (params) => {
    return service.get('/psychological-chat/sessions',{params})
}

export const getSessionDetailAPI = (sessionId) => {
    return service.get(`/psychological-chat/sessions/${sessionId}/messages`)
}

export const getEmotionalPageAPI = (params) => {
    return service.get('/emotion-diary/admin/page', {params})
}

export const deleteEmotionalAPI = (id) => {
    return service.delete(`/emotion-diary/admin/${id}`)
}

export const getAnalyticsOverviewAPI= () => {
    return service.get('/data-analytics/overview')
}

export const logoutAPI = () => {
    return service.post('/user/logout')
}