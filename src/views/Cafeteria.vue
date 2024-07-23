<template>
  <div>
    <head>
      <title>{{ cafeteria.name }}食堂</title>
    </head>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteriaId></CafeteriaHeader>
      <div class="subHeader">
        <h2>{{ cafeteria.name }}食堂</h2>
        <div v-if="hasCollectedCafeteria">
          <button class="userBtn" @click="doCollectCafeteria({cafeteriaId})">收藏该食堂</button>
        </div>
        <div v-else>
          <button class="userBtn" @click="CancelCollectCafeteria({cafeteriaId})">取消收藏</button>
        </div>
      </div>
    </header>

    <body>
      <div class="counter-preview">
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
import { getCafeteria, getCountersOf, hasCollectedCafeteria, doCollectCafeteria, cancelCollectCafeteria } from '@/api/index'

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
    }
  }
}
</script>


<style src="@/assets/css/preview.css">

</style>
