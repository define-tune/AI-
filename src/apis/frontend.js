import service from '../utils/request';

export const registerAPI  = (data) => {
    return service.post('/user/add',data)
}

export const startSessionAPI  = (data) => {
    return service.post('/psychological-chat/session/start',data)
}

export const getSessionListAPI = (params) => {
    return service.get('/psychological-chat/sessions', {params})
}

export const deleteSessionAPI = (sessionId) => {
    return service.delete(`/psychological-chat/sessions/${sessionId}`)
}

export const getSessionDetailAPI = (sessionId) => {
    return service.get(`/psychological-chat/sessions/${sessionId}/messages`)
}

export const getSessionEmotionAPI = (sessionId) => {
    return service.get(`/psychological-chat/session/${sessionId}/emotion`)
}

export const addEmotionDiaryAPI = (data) => {
    return service.post('/emotion-diary',data)
}

export const getKnowledgeListAPI = (params) => {
    return service.get('/knowledge/article/page',{params})
}

export const getKnowledgeDetailAPI = (id) => {
    return service.get(`/knowledge/article/${id}`)
}