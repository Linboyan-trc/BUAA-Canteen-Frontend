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
          <CounterPreview :image="counter.image" :description="counter.description" :likes="counter.likes" />
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
      const cafeteriaMap = {
        student1: '学一',
        student2: '学二',
        student3: '学三',
        student4: '学四',
        student5: '学五',
        student6: '学六',
        teacher: '教工',
        halal: '清真',
        heyi: '合一'
      }
      return cafeteriaMap[cafeteria.value]
    })

    onMounted(() => {
      // 从后端 API 获取指定食堂的窗口数据
      // axios.get(`/api/cafeteria/${cafeteria.value}/counters`).then(response => {
      //   counters.value = response.data
      // })
      // temp
      counters.value = [
        { id: 1, name: '窗口1', image: '/banfan.jpg', description: '窗口1描述', likes: 10 },
        { id: 2, name: '窗口2', image: '/banfan.jpg', description: '窗口2描述', likes: 20 },
        { id: 2, name: '窗口2', image: '/banfan.jpg', description: '窗口2描述', likes: 20 },
        { id: 2, name: '窗口2', image: '/banfan.jpg', description: '窗口2描述', likes: 20 },
        { id: 2, name: '窗口2', image: '/banfan.jpg', description: '窗口2描述', likes: 20 },
        { id: 2, name: '窗口2', image: '/banfan.jpg', description: '窗口2描述', likes: 20 },
        { id: 2, name: '窗口2', image: '/banfan.jpg', description: '窗口2描述', likes: 20 },
        { id: 2, name: '窗口2', image: '/banfan.jpg', description: '窗口2描述', likes: 20 },
        // 其他窗口信息
      ]
    })

    return {
      counters,
      cafeteria,
      cafeteriaName
    }
  }
}
</script>


<style scoped>
.counter-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 调整间距 */
}

.counter-preview a {
  text-decoration: none;
  color: inherit;
}
</style>
