<template>
    <el-dialog
        :title="isEdit ? '编辑文章' : '新增文章'"
        v-model="dialogVisible"
        width="50%"
        @close="handleClose"
    >
        <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit clearable></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="categoryId">
                <el-select v-model="formData.categoryId" placeholder="请选择分类">
                    <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="String(item.value)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要" prop="summary">
                <el-input
                    v-model="formData.summary"
                    :rows="4"
                    type="textarea"
                    placeholder="请输入文章摘要（可选）"
                    maxlength="1000"
                    show-word-limit
                />
            </el-form-item>
            <el-form-item label="标签" prop="tags">
                <el-select
                    v-model="formData.tagArray"
                    multiple
                    placeholder="请选择标签"
                    filterable
                    allow-create
                    style="width: 100%;"
                >
                    <el-option
                        v-for="item in commonTags"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="封面图片">
                <div class="cover-upload">
                    <el-upload
                      class="avatar-upload"
                      action="#"
                      :before-upload="beforeUpload"
                      :http-request="handlelUploadRequest"
                      accept="image/*"
                      :show-file-list="false"
                    >
                        <div v-if="!imgUrl" class="cover-placeholder">
                            <p>点击上传封面</p>
                        </div>
                        <img v-else :src="imgUrl" alt="封面图片" class="cover-image" />
                    </el-upload>
                    <div v-if="imgUrl" class="cover-remove">
                        <el-button type="danger" @click="handleRemove">移除封面</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                 <RichTextEditor
                    v-model="formData.content"
                    placeholder="请输入文章内容，支付富文本格式\n\n可以使用加粗、斜体、列表、标题等格式来丰富文章内容。"
                    :maxCharCount="5000"
                    @change="handleContentChange"
                    @created="handleEditorCreated"
                    min-height="400px"
                 />
            </el-form-item>
        </el-form>
        <div v-if="btnPreview">
            <h3>内容预览</h3>
            <div v-html="formData.content"></div>
        </div>
        <template #footer>
            <el-button @click="btnPreview = !btnPreview">{{ btnPreview ? '隐藏效果' : '预览效果' }}</el-button>
            <el-button @click="handleClose">取消</el-button>
            <el-button @click="handleSubmit" :loading="loading" type="primary">{{ isEdit ? '更新文章' : '创建文章' }}</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, nextTick, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import {
    uploadFileAPI,
    createArticleAPI,
    updateArticleAPI
} from '@/apis/admin'
import { fileBaseUrl } from '@/config'
import RichTextEditor from './RichTextEditor.vue'

const emit = defineEmits(['success'])

const dialogVisible = defineModel({
    
        type: Boolean,
        default: false
    
})
const props = defineProps({
    categoryList: {
        type: Array,
        default: () => []
    },
    article: {
        type: Object,
        default: null
    }
})

const isEdit =  computed(() => !!props.article?.id)
const businessId = ref('')

const getInitialFormData = () => ({
    title: '',
    content: '',
    coverImage: '',
    categoryId: '',
    summary: '',
    tags: '',
    tagArray: [],
    id: ''
})

const formData = reactive(getInitialFormData())

const rules = {
    title: [
        {required: true, message:'请输入文章标题', trigger:'blur'},
        {max: 200, message:'文章标题最多200个字符', trigger:'blur'}
    ],
    categoryId:[
        {required:true, messaage:'请选择分类', trigger:'change'}
    ],
    content:[
        {required:true, message:'请输入文章内容', trigger:'blur'},
        {max:5000, message:'文章内容最多5000个字符', trigger:'blur'}
    ]
}

// 先创建空表单（让 el-form 记录空初始值），再回填编辑数据
watch(
    [() => dialogVisible.value, () => props.article],
    async ([visible]) => {
        if (!visible) return

        // 先清空（此时表单项完成注册，初始值=空）
        formRef.value?.clearValidate?.()
        Object.assign(formData, getInitialFormData())
        businessId.value = ''
        imgUrl.value = null
        btnPreview.value = false
        loading.value = false
        editorInstance.value?.setHtml?.('')
        handleRemove()

        await nextTick()

        if (!isEdit.value) return
        const a = props.article || {}
        Object.assign(formData, a, {
            categoryId: a.categoryId != null ? String(a.categoryId) : ''
        })
        formData.tagArray = typeof a.tags === 'string' && a.tags.trim()
            ? a.tags.split(',').map(s => s.trim()).filter(Boolean)
            : []

        businessId.value = a.id || ''
        imgUrl.value = a.coverImage ? (fileBaseUrl + a.coverImage) : null
        if (formData.content) editorInstance.value?.setHtml?.(formData.content)
    },
    { immediate: true }
)

const commonTags = [
  '情绪管理', '焦虑', '抑郁', '压力', '睡眠', 
  '冥想', '正念', '放松', '心理健康', '自我成长',
  '人际关系', '工作压力', '学习方法', '生活技巧'
]
const handleClose = () => {
    formRef.value?.clearValidate?.()
    Object.assign(formData, getInitialFormData())
    businessId.value = ''
    btnPreview.value = false
    loading.value = false
    handleRemove()
    editorInstance.value?.setHtml?.('')
    dialogVisible.value = false
}

const imgUrl = ref(null)

const beforeUpload= (file) => {
    console.log(file)
    const isImage =  file.type.startsWith('image')
    const isLt5M = file.size / 1024 / 1024 < 5
    if(!isImage) {
        ElMessage.error('上传封面图片，请选择图片文件')
        return false
    }
    if(!isLt5M) {
        ElMessage.error('上传封面图片，图片大小不能超过5MB')
        return false
    }
    return isImage
}

const handlelUploadRequest = async({file}) => {
    businessId.value = crypto.randomUUID()
    const fileRes = await uploadFileAPI(file, {
        businessId: businessId.value
    })

    imgUrl.value = `${fileBaseUrl+fileRes.filePath}`
    formData.coverImage = fileRes.filePath
}

const handleRemove = () => {
    imgUrl.value = ''
    formData.coverImage = ''
}

//富文本
const handleContentChange = (data) => {
    console.log(data);
    
    formData.content = data.html
}

const editorInstance = ref(null)
const handleEditorCreated = (editor) => {
    editorInstance.value = editor
    //编辑
    if(formData.content && editor) {
        nextTick(() => {
            editor.setHtml(formData.content)
        })
    }
}

const btnPreview = ref(false)



//提交
const formRef = ref(null)

const loading = ref(false)

const handleSubmit = () => {
    formRef.value.validate((valid, fields) => {   
        if(valid) {
            loading.value = true
            const submitData= {
                ...formData,
                tags: formData.tagArray.join(',')
            }
            delete submitData.tagArray
            submitData.categoryId = Number(submitData.categoryId)
            console.log(submitData);
            if(!isEdit.value){
                submitData.id = businessId.value
                createArticleAPI(submitData).then(res => {
                    loading.value = false
                    emit('success')
                })
            } else {
                updateArticleAPI(props.article.id, submitData).then(res => {
                    loading.value = false
                    emit('success')
                })
            }
        }
    }) 
}

</script>

<style lang="scss" scoped>
    .cover-placeholder {
        width: 200px;
        height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-items: center;
        color: #8b949e;
        background:#f6f9fa;
    }
    .cover-image {
        width: 200px; height: 120px; display: block;
    }
</style>