<template>
  <div>
    <head>
      <title>{{ cafeteriaName }}食堂</title>
    </head>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteria></CafeteriaHeader>
    </header>

    <body>
      <div class="counter-preview">
        <router-link v-for="counter in counters" :key="counter.id" :to="`/cafeteria/${cafeteria}/counter/${counter.id}`">
          <CounterPreview :counter="counter" />
        </router-link>
      </div>
    </body>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import CafeteriaHeader from '@/components/CafeteriaHeader.vue'
import CounterPreview from '@/components/CounterPreview.vue'
import { useRoute } from 'vue-router'
import { getCounters } from '@/api/index'

export default {
  name: 'Cafeteria',
  components: {
    CafeteriaHeader,
    CounterPreview
  },
  setup() {
    const route = useRoute()
    const counters = ref([])
    const cafeteria = computed(() => route.params.cafeteria)
    const cafeteriaName = computed(() => {
      const cafeteriaMap = ref([
        {'name_en': 'student1', 'name_zh': '学一'},
        {'name_en': 'student2', 'name_zh': '学二'},
        {'name_en': 'student3', 'name_zh': '学三'},
        {'name_en': 'student4', 'name_zh': '学四'},
        {'name_en': 'student5', 'name_zh': '学五'},
        {'name_en': 'student6', 'name_zh': '学六'},
        {'name_en': 'teacher', 'name_zh': '教工'},
        {'name_en': 'halal', 'name_zh': '清真'},
        {'name_en': 'heyi', 'name_zh': '合一厅'},
      ])
      return cafeteriaMap.value.find(c => c.name_en === cafeteria.value).name_zh
    })
    //temp
    counters.value = [
        { id: 1, name: '拌饭', img: 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333', floor: 1, collectCount: 10 },
        { id: 2, name: '基本伙', img: 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333', floor: 2, collectCount: 20 },
        { id: 2, name: '窗口2', img: 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=jpeg?w=500&h=333', floor: 2, collectCount: 20 },
        { id: 2, name: '窗口2', img: 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=jpeg?w=500&h=333', floor: 2, collectCount: 20 },
        { id: 2, name: '窗口2', img: 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=jpeg?w=500&h=333', floor: 2, collectCount: 20 },
        { id: 2, name: '窗口2', img: 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=jpeg?w=500&h=333', floor: 2, collectCount: 20 },
        { id: 2, name: '窗口2', img: 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=jpeg?w=500&h=333', floor: 2, collectCount: 20 },
        { id: 2, name: '窗口2', img: 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=jpeg?w=500&h=333', floor: 2, collectCount: 20 },
        // 其他窗口信息
      ]
    
    // onMounted(() => {
    //   // 从后端 API 获取指定食堂的窗口数据
    //   getCountersOf(cafeteria.value)
    // })
    // const getCountersOf = async(cafeteriaId) => {
    //   try {
    //     const response = await getCounters(cafeteriaId)
    //     counters.value = response.data
    //   } catch (error) {
    //     console.error('获取柜台数据失败:', error)
    //   }
    // }

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
