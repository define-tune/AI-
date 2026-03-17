<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="card-content">
            <div class="avatar users">
              <el-image :src="iconUrl1" style="width: 40px; height: 40px;" />
            </div>
            <div class="info">
              <p class="title">总用户数</p>
              <p class="value">{{ aiData.systemOverview?.totalUsers ?? 0 }}</p>
              <p class="subtitle-title">活跃用户: {{ aiData.systemOverview?.activeUsers ?? 0 }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-content">
            <div class="avatar like">
              <el-image :src="iconUrl2" style="width: 40px; height: 40px;" />
            </div>
            <div class="info">
              <p class="title">情绪日志</p>
              <p class="value">{{ aiData.systemOverview?.totalDiaries ?? 0 }}</p>
              <p class="subtitle-title">今日新增: {{ aiData.systemOverview?.todayNewDiaries ?? 0 }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-content">
            <div class="avatar comments">
              <el-image :src="iconUrl3" style="width: 40px; height: 40px;" />
            </div>
            <div class="info">
              <p class="title">咨询会话</p>
              <p class="value">{{ aiData.systemOverview?.totalSessions ?? 0 }}</p>
              <p class="subtitle-title">今日新增: {{ aiData.systemOverview?.todayNewSessions ?? 0 }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-content">
            <div class="avatar smile ">
              <el-image :src="iconUrl4" style="width: 40px; height: 40px;" />
            </div>
            <div class="info">
              <p class="title">平均情绪</p>
              <p class="value">{{ aiData.systemOverview?.avgMoodScore ?? 0 }}/10</p>
              <p class="subtitle-title">情绪健康指数</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card style="width: 100%;">
          <template #header>
            <div class="header-content">
              情绪趋势分析
            </div>
          </template>
          <div class="chart-content">
            <div ref="emotionChartRef" style="width: 100%; height: 300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="width: 100%;">
          <template #header>
            <div class="header-content">
              咨询会话统计
            </div>
          </template>
          <div class="chart-content">
            <div class="consultation-stats">
              <div class="stat-item">
                <div class="stat-label">总会话数</div>
                <div class="statvalue">{{aiData.consultationStats?.totalSessions ?? 0 }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">平均时长</div>
                <div class="statvalue">{{aiData.consultationStats?.avgDurationMinutes ?? 0 }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">活跃用户</div>
                <div class="statvalue">{{aiData.systemOverview.activeUsers ?? 0 }}</div>
              </div>
            </div>
            <div ref="consultationChartRef" style="width: 100%; height: 260px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-card style="width: 100%;">
        <template #header>
          <div class="header-content">
            用户活跃度趋势
          </div>
        </template>
        <div class="chart-content">
          <div ref="userActivityChartRef" style="width: 100%; height: 300px;"></div>
        </div>
      </el-card>
    </el-row>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
    getAnalyticsOverviewAPI
} from '@/apis/admin'
import * as echarts from 'echarts'


const aiData = ref({
    systemOverview: {
        totalUsers: 0,
        activeUsers: 0
    }
})


const iconUrl1 = new URL('@/assets/images/users.png', import.meta.url).href
const iconUrl2 = new URL('@/assets/images/like.png', import.meta.url).href
const iconUrl3 = new URL('@/assets/images/comments.png', import.meta.url).href
const iconUrl4 = new URL('@/assets/images/smile.png', import.meta.url).href


const getAnalyticsOverview = async() => {
    const data = await getAnalyticsOverviewAPI()
    aiData.value = {
        ...aiData.value,
        ...(data || {}),
        systemOverview: {
            ...aiData.value.systemOverview,
            ...(data?.systemOverview || {})
        }
    }
    console.log(aiData.value);
    
}

//初始化图表
const initCharts = () => {
    initEmotionChart()
    initConsultationChart()
    initUserActivityChart()
}

//情绪趋势
let emotionChart = null
const emotionChartRef = ref(null)
const initEmotionChart = () => {
    if (!emotionChartRef.value) return   
    //销毁现有图表
    if (emotionChart) {
        emotionChart.dispose()
    }
    emotionChart = echarts.init(emotionChartRef.value)
    //获取情绪趋势的数据
    const TrendData = aiData.value.emotionTrend
    //配置项
    const option = {
        title: {
            text:'情绪趋势分析',
            textStyle: {
                color:'#2d3436',
                fontSize: 16,
                fontWeight: '600'
            },
            left: 'center',
            top:10
        },
        tooltip: {
            trigger: 'axis',
            borderColor: '#fab1a0',
            borderWidth:1,
            textStyle: {
                color: '#2d3436'
            }
        },
        legend: {
            data: ['平均情绪得分', '记录数量'],
            top: 40
        },
        grid: {
            left: '3%',
            right: '4%',
            top: 80,
            bottom: '3%'
        },
        xAxis: {
            type:'category',
            data: TrendData.map(item => item.date),
            axisLine: {
                lineStyle: {
                    color: '#2d3436'
                }
            }
        },
        yAxis:[{
            type: 'value',
            name: '情绪评分', 
            position: 'left', 
            axisLine: {
                lineStyle:  {
                    color: '#2d3436'
                }
            }
        },{
            type: 'value',
            name: '记录数量', 
            position: 'right',
            axisLine: {
                lineStyle:  {
                    color: '#2d3436'
                }
            }
        }],
        series: [{
            name: '平均情绪得分',
            type: 'line',
            data: TrendData.map(item => item.avgMoodScore),
            smooth: true,
            lineStyle: {
                width: 3,
                color: '#fab1a0'
            },
            itemStyle: {
                color: '#fab1a0'
            }
        },{
            name: '记录数量',
            type: 'line',
            data: TrendData.map(item => item.recordCount),
            smooth: true,
            lineStyle: {
                width: 3,
                color: '#eeb5a3'
            },
            itemStyle: {
                color: '#eeb5a3'
            }
        }]
    } 
    emotionChart.setOption(option)
}
//会话统计
let consultationChart = null
const consultationChartRef = ref(null)
const initConsultationChart = () => {
    if(!consultationChartRef.value) return
    if(consultationChart) {
        consultationChart.dispose()
    }
    consultationChart = echarts.init(consultationChartRef.value)

    //获取数据
    const dailyTrend = aiData.value.consultationStats.dailyTrend

    const option = {
  title: {
    text: '咨询活动统计',
    textStyle: {
      fontSize: 16,
      fontWeight: 600,
      color: '#2d3436'
    },
    left: 'center',
    top: 10
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#fab1a0',
    borderWidth: 1,
    textStyle: {
      color: '#2d3436'
    }
  },
  legend: {
    data: ['会话数量', '参与用户数'],
    top: 40,
    textStyle: {
      color: '#636e72'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: 80,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: dailyTrend.map(item => item.date),
    axisLine: {
      lineStyle: {
        color: 'rgba(244, 162, 97, 0.3)'
      }
    },
    axisLabel: {
      color: '#636e72'
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#636e72'
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(244, 162, 97, 0.3)'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(244, 162, 97, 0.1)'
      }
    }
  },
  series: [
    {
      name: '会话数量',
      type: 'bar',
      data: dailyTrend.map(item => item.sessionCount),
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#74b9ff' },
            { offset: 1, color: '#0984e3' }
          ]
        }
      },
      barWidth: '40%'
    },
    {
      name: '参与用户数',
      type: 'bar',
      data: dailyTrend.map(item => item.userCount),
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#fdcb6e' },
            { offset: 1, color: '#f39c12' }
          ]
        }
      },
      barWidth: '40%'
    }
  ]
}

    consultationChart.setOption(option)
}

//用户活跃度分析
let userActivityChart = null
const userActivityChartRef = ref(null)
const initUserActivityChart = () => {
  if(!userActivityChartRef.value) return
  if(userActivityChart) {
    userActivityChart.dispose()
  }
  userActivityChart = echarts.init(userActivityChartRef.value)

  //数据
  const activityData = aiData.value.userActivity

  const option = {
  title: {
    text: '用户活跃度趋势',
    textStyle: {
      fontSize: 16,
      fontWeight: 600,
      color: '#2d3436'
    },
    left: 'center',
    top: 10
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#fab1a0',
    borderWidth: 1,
    textStyle: {
      color: '#2d3436'
    }
  },
  legend: {
    data: ['活跃用户', '新增用户', '日记用户', '咨询用户'],
    top: 40,
    textStyle: {
      color: '#636e72'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: 80,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: activityData.map(item => item.date),
    axisLine: {
      lineStyle: {
        color: 'rgba(244, 162, 97, 0.3)'
      }
    },
    axisLabel: {
      color: '#636e72'
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#636e72'
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(244, 162, 97, 0.3)'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(244, 162, 97, 0.1)'
      }
    }
  },
  series: [
    {
      name: '活跃用户',
      type: 'line',
      data: activityData.map(item => item.activeUsers),
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#a29bfe'
      },
      itemStyle: {
        color: '#a29bfe'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(162, 155, 254, 0.4)' },
            { offset: 1, color: 'rgba(162, 155, 254, 0.1)' }
          ]
        }
      }
    },
    {
      name: '新增用户',
      type: 'line',
      data: activityData.map(item => item.newUsers),
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#fdcb6e'
      },
      itemStyle: {
        color: '#fdcb6e'
      }
    },
    {
      name: '日记用户',
      type: 'line',
      data: activityData.map(item => item.diaryUsers),
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#00b894'
      },
      itemStyle: {
        color: '#00b894'
      }
    },
    {
      name: '咨询用户',
      type: 'line',
      data: activityData.map(item => item.consultationUsers),
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#fab1a0'
      },
      itemStyle: {
        color: '#fab1a0'
      }
    }
  ]
}
 userActivityChart.setOption(option)
}
onMounted(async() => {
    await getAnalyticsOverview()
    initCharts()
})
</script>

<style lang="scss" scoped>
/* 1. 滚动条整体部分：可以设置宽度和高度 */
.dashboard-container::-webkit-scrollbar {
    width: 10px;          /* 纵向滚动条宽度 */
    height: 10px;         /* 横向滚动条高度 */
}

/* 2. 滚动条轨道：滑块移动的背景区域 */
.dashboard-container::-webkit-scrollbar-track {
    background: #f9f9f9;  /* 浅灰色背景 */
    border-radius: 5px;   /* 圆角 */
}

/* 3. 滚动条滑块：用户拖拽的部分 */
.dashboard-container::-webkit-scrollbar-thumb {
    background-color: pink;    /* 你的主题色：粉色 */
    border-radius: 10px;       /* 胶囊状圆角 */
    border: 2px solid #f9f9f9; /* 利用边框给滑块四周留白，视觉更精致 */
}

/* 4. 鼠标悬停时的滑块：增加交互感 */
.dashboard-container::-webkit-scrollbar-thumb:hover {
    background-color: #ffb6c1; /* 稍微深一点的粉色 */
    cursor: pointer;
}
.dashboard-container {
    overflow-y: auto;
    .card-content {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 12px;
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        &.users {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        &.like {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        &.comments {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        &.smile {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }
      }
      .info {
        .title {
          font-size: 14px;
          color: #7f8c8d;
          margin-bottom: 4px;
        }
        .value {
          font-size: 24px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 4px
        }
        .subtitle-title {
          font-size: 12px;
          color: #95a5a6;
        }
      }
    }
    .chart-content {
      padding: 20px;
      height: 300px;
      position: relative;

      canvas {
        width: 100% !important;
        height: 100% !important;
      }

      .consultation-stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;

        .stat-item {
          text-align: center;

          .stat-label {
            font-size: 12px;
            color: #7f8c8d;
            margin-bottom: 4px;
          }

          .stat-value {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
          }
        }
      }
    }
  }
</style>