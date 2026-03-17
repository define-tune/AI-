<template>
    <div>
        <PageHead title="知识文章">
            <template #buttons>
                <el-button type="primary" @click="handleEdit">新增</el-button>
            </template>
        </PageHead>
        <TableSearch :formItem="formItem"  @search="handleSearch"> </TableSearch>
        <el-table :data="tableData" style="width: 100%;  margin-top: 25px;">
          <el-table-column label="文章标题" fixed="left" width="450">
            <template #default="scope">
                <div style="display: flex; align-items: center;">
                  <el-icon><timer/></el-icon>
                  <span>{{ scope.row.title }}</span>
                </div>
            </template>
          </el-table-column>
          <el-table-column label="分类" width="200">
            <template #default="scope">
                <div style="display: flex; align-items: center;">
                  <el-icon><timer/></el-icon>
                  <span>{{ categoryMap[scope.row.categoryId]}}</span>
                </div>
            </template>
          </el-table-column>
          <el-table-column prop="authorName" width="150" label="作者"></el-table-column>
          <el-table-column prop="readCount" width="150" label="阅读量"></el-table-column>
          <el-table-column prop="updatedAt" label="发布时间"></el-table-column>
          <el-table-column label="操作" width="250" fixed="right" align="center">
            <template #default="scope">
                <el-button @click="handleEdit(scope.row)" text type="primary">编辑</el-button>
                <el-button v-if="scope.row.status === 0 || scope.row.status === 2" text type="success" @click="handleSwitchStatus(scope.row.id,1)">发布</el-button>
                <el-button v-if="scope.row.status === 1" text type="warning" @click="handleSwitchStatus(scope.row.id,2)">下线</el-button>
                <el-button text type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination 
          style="margin-top: 20px;"
          layout="prev, pager, next" 
          :page-size="paginantion.size"
          :total="paginantion.total" 
          @change="handleChange"
          v-model:current-page="paginantion.currentPage"
        />
        <ArticleDialog  :article="currentArticle" v-model="dialogVisible" :categoryList="categoryList" @success="handleSuccess"></ArticleDialog>
    </div>
</template>

<script setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { 
  getCategoryListAPI,
  getAticlePageAPI,
  getAticleDetailAPI,
  switchArticleStatusAPI,
  deleteArticleAPI
 } from '@/apis/admin'
import { onMounted, reactive, ref } from 'vue'
import ArticleDialog from '@/components/ArticleDialog.vue'
import { ElMessage } from 'element-plus'

//分类列表
const categoryList = ref([])
//分类映射
const categoryMap = reactive({})
//列表数据
const tableData = ref([])

//新增和编辑
const dialogVisible = ref()
const formItem = [
  { comp: 'input', prop: 'title', label: '文章标题', placeholder: '请输入文本标题' },
  { comp: 'select', prop: 'categoryId', label: '分类', placeholder: '请选择分类'},
  { comp: 'select', prop: 'status', label: '状态', placeholder: '请输入文章内容', options: [
    {
     label: '草稿',
     value: '0'
    },
    {
      label: '已发布',
      value: '1'
    },
    {
      label: '已下线',
      value: '2'
    }
  ]}

]

//分页参数
const paginantion = reactive({
  currentPage:1,
  size:10,
  total:0
})
const categoryParams = ref({})

const handleSearch = async (formData) => {
  // 只有点击查询时（有 formData）才更新筛选条件
  if (formData) {
    categoryParams.value = { ...formData }
    // 新搜索从第 1 页开始
    paginantion.currentPage = 1
    console.log(1);
    
  }

  const params = {
    ...paginantion,
    ...categoryParams.value
  }

  const { records, total } = await getAticlePageAPI(params)
  tableData.value = records
  paginantion.total = total
}

// 获取分类列表
const getCategoryList = async () => {
  const data  = await getCategoryListAPI()
  categoryList.value = data.map(item => {
    categoryMap[item.id] = item.categoryName
    return {
      label: item.categoryName,
      value: item.id
    }
  })
  formItem[1].options = categoryList.value
}

const handleChange = async (currentPage) => {
    paginantion.currentPage = currentPage
    handleSearch()
}

onMounted(async () => {
  await getCategoryList()
  
})

const handleSuccess = () => {
  dialogVisible.value = false
  //刷新列表
  handleSearch()
}

const currentArticle = ref(null)
const handleEdit = async(row) => {
  if(!row.id) {
    currentArticle.value = null
  } else {
    await getAticleDetailAPI(row.id).then(res => {
      currentArticle.value = res
    })
  } 
  dialogVisible.value = true
}


const handleSwitchStatus = async (id,status) => {
  await switchArticleStatusAPI(id,{status}).then(res => {
    ElMessage.success('操作成功')
    handleSearch()
  }).catch(err => {
    ElMessage.error('操作失败')
  })
}

const handleDelete = async (id) => {
  await deleteArticleAPI(id).then(res => {
    ElMessage.success('删除成功')
    handleSearch()
  }).catch(err => {
    ElMessage.error('删除失败')
  })
}

onMounted(() => {
  handleSearch()
})
</script>

<style lang="scss" scoped>

</style>