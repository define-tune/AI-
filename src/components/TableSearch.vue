<template>
    <el-form :model="formData" :rules="rules" ref="formRef" class="search-form">
        <template v-for="item in formItem" :key="item.prop">   
            <el-form-item :label="item.label" :prop="item.prop" class="form-item-wrap">
                <component :is="isComp(item.comp)" :placeholder='item.placeholder' v-model="formData[item.prop]" class="form-input">
                    <template v-if="item.comp === 'select'">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
                    </template>
                </component>
            </el-form-item>
        </template>
    </el-form>
    <div style="display: flex;">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="default" @click="handleReset(formRef)">重置</el-button>
    </div>
</template>

<script setup>
import { ref , reactive} from 'vue';
const props = defineProps({
    formItem: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['search'])

const isComp = (comp) => {
    return{
        input:'elInput',
        select:'elSelect',
    }[comp]
    //根据comp的键返回对应的组件
}

const formData = reactive({})
const rules = ref({})
const formRef = ref(null)

const handleSearch = () => {
    emit('search', formData)
}
const handleReset = (formRef) => {
    // 先重置表单在查询
    if(!formRef) return
    formRef.resetFields()
    handleSearch()
}
</script>

<style lang="scss" scoped>
.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  align-items: flex-end;

  .form-item-wrap {
    flex: 1 1 200px;
    min-width: 180px;
    max-width: 300px;
  }

  .form-input {
    width: 100%;
    margin-bottom: 10px;
  }

  .el-form-item {
    margin-bottom: 0;
  }
}
</style>