<template>
  <div>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteria></CafeteriaHeader>
      <h1>{{ counterName }}</h1>
    </header>
    <ul>
      <li v-for="dish in dishes" :key="dish.id">
        <router-link :to="`/dish/${dish.id}`">{{ dish.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import CafeteriaHeader from '@/components/CafeteriaHeader.vue'
import { useRoute } from 'vue-router';

export default {
  name: 'Counter',
  components: {
    CafeteriaHeader
  },
  setup() {
    const route = useRoute()
    const counterName = ref('')
    const dishes = ref([])

    const counterId = computed(() => route.params.counterId)
    const cafeteria = computed(() => route.params.cafeteria)

    onMounted(() => {
      // 从后端 API 获取指定窗口的菜肴数据和窗口名称
      // axios.get(`/api/counter/${counterId.value}`).then(response => {
      //   counterName.value = response.data.name
      //   dishes.value = response.data.dishes
      // })
      // temp
      counterName.value = '基本伙'
      dishes.value = [
        { id: 1, name: '红烧肉' },
        { id: 2, name: '鱼香肉丝' },
        { id: 3, name: '宫保鸡丁' }
      ]
    })

    return {
      counterName,
      dishes,
      counterId,
      cafeteria
    }
  }
}
</script>
