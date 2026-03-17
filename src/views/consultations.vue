<template>
    <div>
        <PageHead title="咨询记录"/>
        <el-table :data="tableData" style="width: 100%; margin-top: 25px;">
            <el-table-column label="会话ID" width="150">
                <template #default="{row}">
                    <div class="nickname">
                        <span>{{ row.userNickname }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="情绪标签" >
                <template #default="{row}">
                    <div class="emotion-tag-wrapper">
                        <h3>{{ row.sessionTitle }}</h3>
                        <p>{{ row.lastMessageContent }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="消息数" prop="messageCount" width="100">
            </el-table-column>
            <el-table-column label="时间" prop="lastMessageTime" width="200">
            </el-table-column>
            <el-table-column label="操作" prop="createdAt" width="120">
                <template #default="{row}">
                    <el-button text type="primary" @click="handleDetail(row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px;"
          layout="prev, pager, next" 
          :page-size="pagination.size"
          :total="pagination.total" 
          @change="handleChange"
          v-model:current-page="pagination.currentPage"
        ></el-pagination>
        <el-dialog
            v-model="showDetailDialog"
            title="咨询会话详情"
            width="70%"
            :close-on-click-modal="false"
            class="session-detail-dialog"
            style="max-height: 90vh;"
            @close="handleClose"
        >
            <div class="session-detail">
                <div class="detail-header">
                    <div class="detail-row">
                        <div class="detail-label">用户：</div>
                        <div class="detail-value">{{ sessionDetail.userNickname }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">开始时间:</div>
                        <div class="detail-value">{{ sessionDetail.startedAt }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">消息数:</div>
                        <div class="detail-value">{{ sessionDetail.messageCount }}</div>
                    </div>
                </div>
                <div class="message-container">
                    <div class="message-header">
                        <h4>对话记录</h4>
                    </div>
                    <div class="message-list" v-loading="loadingMessages">
                            <div v-for="(message, index) in sessionMessages" :key="index" class="message-item" :class="message.senderType === 1 ? 'user' : 'ai'">
                                <div class="title">
                                    <h3>{{ message.senderTypeDesc }}</h3>
                                    <span class="time">{{ message.createdAt }}</span>
                                </div>
                                <p class="content">{{ message.content }}</p>
                            </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { 
    getConsultationsAPI,
    getSessionDetailAPI
} from '@/apis/admin'
import { ElMessage } from 'element-plus'
import PageHead from '@/components/PageHead.vue'


const pagination = reactive({
    currentPage: 1,
    size: 10,
    total: 0
})
const tableData = ref([])

//会话详情
const sessionDetail = ref({})
const sessionMessages = ref([])
const loadingMessages = ref(true)
const handleDetail = async(row) => {
    console.log(row)
    sessionDetail.value = row
    showDetailDialog.value = true
    await getSessionDetailAPI(row.id).then(res => {
        console.log(res);
        sessionMessages.value = res
        loadingMessages.value = false
    })
    
}
const handleClose = () => {
    loadingMessages.value = true
}


const handleSearch = async () => {
    await getConsultationsAPI(pagination).then(res => {
        const { records, total } = res
        tableData.value = records
        pagination.total = total
    }).catch(err => {
        ElMessage.error('获取咨询记录失败')
    })
}

const handleChange = (e) => {
    pagination.currentPage = e
    handleSearch()
}

const showDetailDialog = ref(false)



onMounted(async () => {
    await handleSearch()
})
</script>

<style lang="scss" scoped>
:deep(.session-detail-dialog .el-dialog__body) {
    // 让弹框内容区高度受控，列表超出时在内部滚动
    max-height: calc(70vh - 120px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.nickname {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #c0bebe;
    font-size: 14px;
    color: #fff;
}
.emotion-tag-wrapper {
    display: flex;
    flex-direction: column;
}
.session-detail {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    .detail-header {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: #ece9e9;
        border-radius: 5px;
        padding: 15px;
        .detail-row {
            display: flex;
            .detail-label {
                width: 80px;
                font-weight: 600;
            }
        }
    }
    .message-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        .message-header {
            margin: 20px 0;
        }
        .message-list {
            display: flex;
            flex-direction: column;
            padding: 15px;
            gap: 10px;
            border-radius: 5px;
            border: 1px solid #ece9e9;
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            .message-item {
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                padding: 10px;
                gap: 5px;
                .title {
                    display:flex;
                    justify-content:space-between;
                    .time {
                        font-size: 14px;
                    }
                }

                &.user {
                    background-color: rgb(223, 250, 251);
                }
                &.ai {
                    background-color: rgb(224, 249, 224);
                }
            }
        }
    }
}
</style>    