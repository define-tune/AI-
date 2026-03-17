<template>
    <el-rate v-model="model" :max="10"  :icons="icons" 
    :disabled="disabled" :texts="texts" :show-text="showText"
    :size="size"
    />
</template>

<script setup>
import { ref } from 'vue'
import {
     Drizzling, MostlyCloudy, Sunny
} from '@element-plus/icons-vue'
const icons = { 4: Drizzling, 8: { value: MostlyCloudy, excluded: true }, 10: Sunny }

const model = defineModel('score',{
    type: Number,
    default: 0
})
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    texts: {
        type: Array,
        default: () => []
    },
    showText: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'default'
    }
})
</script>

<style lang="scss" scoped>

</style>