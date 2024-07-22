<template>
  <div>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteria></CafeteriaHeader>
      <div class="subHeader">
        <h2>柜台名：{{ counterName }}</h2>
        <button class="userBtn" @click="doCollect({counterId})">收藏该柜台</button>
      </div>
    </header>

    <body>
      <div class="dishes-preview">
        <div v-for="dish in dishes" :key="dish.id">
          <Preview :name="'dish'" :preview="dish" />
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import CafeteriaHeader from '@/components/CafeteriaHeader.vue'
import Preview from '@/components/Preview.vue'
import { useRoute } from 'vue-router';
import { getDishes } from '@/api';

export default {
  name: 'Counter',
  components: {
    CafeteriaHeader,
    Preview,
  },
  setup() {
    const route = useRoute()
    const counterName = ref('')
    const dishes = ref([])

    const counterId = computed(() => route.params.counterId)
    const cafeteria = computed(() => route.params.cafeteria)

    counterName.value = '基本伙'    
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

<style src="@/assets/css/preview.css">

</style>