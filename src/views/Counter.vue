<template>
  <div>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteria></CafeteriaHeader>
      <h1>{{ counterName }}</h1>
    </header>

    <body>
      <div class="dishes-preview">
        <router-link v-for="dish in dishes" :key="dish.id" :to="`/dish/${dish.id}`">
          <DishPreview :name="dish.name" :img="dish.img" :collectCount="dish.collectCount" :ateCount="dish.ateCount" />
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

    onMounted(() => {
      getDishesOf({ cafeteria: cafeteria.value, counterId: counterId.value })
    })
    const getDishesOf = async ({ cafeteria, counterId }) => {
      try {
        const response = getDishes({ cafeteria, counterId })
        dishes.value = response.data
      } catch (error) {
        console.error('获取', cafeteria, '的', counterId, '窗口菜肴失败:', error)
      }
    }


    return {
      counterName,
      dishes,
      counterId,
      cafeteria
    }
  }
}
</script>

<style scoped>
.dishes-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  /* 调整间距 */
}

.dishes-preview a {
  text-decoration: none;
  color: inherit;
}
</style>