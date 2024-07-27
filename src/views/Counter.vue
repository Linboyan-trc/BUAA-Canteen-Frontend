<template>
  <div>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteriaId></CafeteriaHeader>
      <div class="subHeader">
        <h2>柜台名：{{ counter.name }}</h2>
        <div v-if="!hasCollectedCounter">
          <button class="userBtn" @click="doCollect">收藏该柜台</button>
        </div>
        <div v-else>
          <button class="userBtn" @click="cancelCollect">取消收藏</button>
        </div>
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
import { cancelCollectCounter, doCollectCounter, getCounter, getDishes } from '@/api';
import { useUserStore } from '@/store/user';

export default {
  name: 'Counter',
  components: {
    CafeteriaHeader,
    Preview,
  },
  setup() {
    const route = useRoute()
    const counter = ref({})    
    const dishes = ref([])
    const userStore = useUserStore()

    const counterId = computed(() => Number(route.params.counterId))
    const cafeteriaId = computed(() => Number(route.params.cafeteriaId))
    const hasCollectedCounter = computed(() => userStore.userCollectCounters.includes(counterId.value))
    const doCollect = async() => {
      const res = await doCollectCounter({id: counterId});
      ElMessage({ type: 'success', message: res.data.info });
      userStore.extendUserInfo('counter', counterId.value);
    }
    const cancelCollect = async() => {
      const res = await cancelCollectCounter({id: counterId});
      ElMessage({ type: 'success', message: res.data.info });
      userStore.removeUserInfo('counter', counterId.value);
    }
    onMounted(async() => {
      try {
        const response = await getDishes({ counterId })
        dishes.value = response.data
      } catch (error) {
        console.error('获取', cafeteria, '的', counterId, '窗口菜肴失败:', error)
      }
      try {
        const response = await getCounter({ counterId}) // 替换为实际的 counterId
        counter.value = response.data
      } catch (error) {
        console.error('获取 counter 失败:', error)
      }
    })

    return {
      counter,
      dishes,
      counterId,
      cafeteriaId,
      hasCollectedCounter,
      doCollect,
      cancelCollect,
    }
  },
}
</script>

<style scoped>

</style>