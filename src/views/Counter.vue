<template>
  <div>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteria></CafeteriaHeader>
      <h1 style="margin-left: 20px;">{{ counterName }}</h1>
    </header>

    <body>
      <div class="dishes-preview">
        <router-link v-for="dish in dishes" :key="dish.id" :to="`/dish/${dish.id}`">
          <DishPreview :dish="dish" />
        </router-link>
      </div>
    </body>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import CafeteriaHeader from '@/components/CafeteriaHeader.vue'
import DishPreview from '@/components/DishPreview.vue'
import { useRoute } from 'vue-router';
import { getDishes } from '@/api';

export default {
  name: 'Counter',
  components: {
    CafeteriaHeader,
    DishPreview,
  },
  setup() {
    const route = useRoute()
    const counterName = ref('')
    const dishes = ref([])

    const counterId = computed(() => route.params.counterId)
    const cafeteria = computed(() => route.params.cafeteria)

    //temp
    counterName.value = '基本伙'
    dishes.value = [
      { id: 1, name: '鸡排饭', img: 'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500', collectCount: 10, ateCount: 5 },
      { id: 2, name: '三合一面', img: 'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500', collectCount: 20, ateCount: 10 },
      { id: 3, name: '三合一面', img: 'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500', collectCount: 30, ateCount: 15 },
      { id: 4, name: '三合一面', img: 'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500', collectCount: 40, ateCount: 20 },
      { id: 5, name: '三合一面', img: 'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500', collectCount: 50, ateCount: 25 },
      { id: 6, name: '三合一面', img: 'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500', collectCount: 60, ateCount: 30 },
      { id: 7, name: '三合一面', img: 'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500', collectCount: 70, ateCount: 35 },
      { id: 8, name: '三合一面', img: 'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500', collectCount: 80, ateCount: 40 },
    ]
    // onMounted(() => {
    //   getDishesOf({ cafeteria: cafeteria.value, counterId: counterId.value })
    // })
    // const getDishesOf = async ({ cafeteria, counterId }) => {
    //   try {
    //     const response = getDishes({ cafeteria, counterId })
    //     dishes.value = response.data
    //   } catch (error) {
    //     console.error('获取', cafeteria, '的', counterId, '窗口菜肴失败:', error)
    //   }
    // }


    return {
      counterName,
      dishes,
      counterId,
      cafeteria
    }
  }
}
</script>

<style src="@/assets/css/preview.css">

</style>