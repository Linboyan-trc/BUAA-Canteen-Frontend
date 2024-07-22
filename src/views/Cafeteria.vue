<template>
  <div>
    <head>
      <title>{{ cafeteriaName }}食堂</title>
    </head>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteria></CafeteriaHeader>
      <div class="subHeader">
        <h2>{{ cafeteriaName }}食堂</h2>
        <button class="userBtn" @click="doCollect({cafeteria})">收藏该食堂</button>
      </div>
    </header>

    <body>
      <div class="counter-preview">
        <div v-for="counter in counters" :key="counter.id">
          <Preview :name="'counter'" :preview="counter" :cafeteria="cafeteria"/>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import CafeteriaHeader from '@/components/CafeteriaHeader.vue'
import Preview from '@/components/Preview.vue'
import { useRoute } from 'vue-router'
import { getCounters } from '@/api/index'

export default {
  name: 'Cafeteria',
  components: {
    CafeteriaHeader,
    Preview
  },
  setup() {
    const route = useRoute()
    const counters = ref([])
    const cafeteria = computed(() => route.params.cafeteria)
    const cafeteriaName = computed(() => {
      const cafeteriaMap = ref([
            { name_en: 'xylnorth', name_zh: '学院路北区' },
            { name_en: 'xyleast', name_zh: '学院路东区' },
            { name_en: 'xylwest', name_zh: '学院路西区' },
            { name_en: 'shwest', name_zh: '沙河西区'},
            { name_en: 'sheast', name_zh: '沙河东区'}
        ])
      return cafeteriaMap.value.find(c => c.name_en === cafeteria.value).name_zh
    })
  
    onMounted(() => {
      // 从后端 API 获取指定食堂的窗口数据
      getCountersOf(cafeteria.value)
    })
    const getCountersOf = async(name) => {
      try {
        const response = await getCounters(name)
        counters.value = response.data
      } catch (error) {
        console.error('获取柜台数据失败:', error)
      }
    }

    return {
      counters,
      cafeteria,
      cafeteriaName,
    }
  }
}
</script>


<style src="@/assets/css/preview.css">

</style>
