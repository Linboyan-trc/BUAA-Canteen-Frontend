<template>
  <div>
    <head>
      <title>{{ cafeteria.name }}食堂</title>
    </head>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteriaId></CafeteriaHeader>
      <div class="subHeader">
        <h2>{{ cafeteria.name }}食堂</h2>
        <div v-if="!hasCollectedCafeteria">
          <button class="userBtn" @click="doCollect({cafeteriaId})">收藏该食堂</button>
        </div>
        <div v-else>
          <button class="userBtn" @click="cancelCollect({cafeteriaId})">取消收藏</button>
        </div>
      </div>
    </header>

    <body>
      <div class="counters-preview">
        <div v-for="counter in counters" :key="counter.id">
          <Preview :name="'counter'" :preview="counter" :cafeteriaId="cafeteriaId"/>
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
import { getCafeteria, getCountersOf, doCollectCafeteria, cancelCollectCafeteria } from '@/api'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'

export default {
  name: 'Cafeteria',
  components: {
    CafeteriaHeader,
    Preview
  },
  setup() {
    const route = useRoute()
    const cafeteria = ref({})
    const counters = ref([])
    const cafeteriaId = computed(() => Number(route.params.cafeteriaId))

    const userStore = useUserStore()
    const hasCollectedCafeteria = computed(() => userStore.userCollectCafeterias.includes(cafeteriaId.value))
    console.log('hasCollectedCafeteria:', hasCollectedCafeteria.value)
    const doCollect = async() => {
      const res = await doCollectCafeteria({cafeteriaId});
      ElMessage({ type: 'success', message: res.data.info });
      userStore.extendUserInfo('cafeteria', cafeteriaId.value);
    }
    const cancelCollect = async() => {
      const res = await cancelCollectCafeteria({cafeteriaId});
      ElMessage({ type: 'success', message: res.data.info });
      userStore.removeUserInfo('cafeteria', cafeteriaId.value);
    }
    onMounted(async() => {
      const res = await getCafeteria({cafeteriaId})
      cafeteria.value = res.data
      console.log('cafeteria:', cafeteria.value)
      try {
        const response = await getCountersOf({cafeteriaId})
        counters.value = response.data
      } catch (error) {
        console.error('获取柜台数据失败:', error)
      }
    })

    return {
      cafeteria,
      counters,
      cafeteriaId,
      hasCollectedCafeteria,
      doCollect,
      cancelCollect
    }
  }
}
</script>


<style scoped>

</style>
