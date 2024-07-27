<template>
  <div>
    <head>
      <title>{{ cafeteria.name }}食堂</title>
    </head>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteriaId></CafeteriaHeader>
      <div class="subHeader">
        <h2>{{ cafeteria.name }}</h2>
        <div v-if="!hasCollectedCafeteria">
          <button class="userBtn" @click="doCollect">收藏该食堂</button>
        </div>
        <div v-else>
          <button class="userBtn" @click="cancelCollect">取消收藏</button>
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
import { ref, computed, onMounted, watch } from 'vue'
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
    console.log(`现在食堂id${cafeteriaId.value}`)

    const userStore = useUserStore()
    const hasCollectedCafeteria = computed(() => userStore.userCollectCafeterias.includes(cafeteriaId.value))
    console.log('hasCollectedCafeteria:', hasCollectedCafeteria.value)

    const doCollect = async() => {
      const res = await doCollectCafeteria({id: cafeteriaId});
      ElMessage({ type: 'success', message: res.data.info });
      userStore.extendUserInfo('cafeteria', cafeteriaId.value);
    }
    const cancelCollect = async() => {
      const res = await cancelCollectCafeteria({id: cafeteriaId});
      ElMessage({ type: 'success', message: res.data.info });
      userStore.removeUserInfo('cafeteria', cafeteriaId.value);
    }
    const fetchCafeteriaData = async (id) => {
      try {
        console.log(`现在食堂id是${id}`)
        const res = await getCafeteria({ cafeteriaId: id });
        cafeteria.value = res.data;
        console.log(res)
        console.log('cafeteria:', cafeteria.value);
        
        const response = await getCountersOf({ cafeteriaId: id });
        counters.value = response.data;
      } catch (error) {
        console.error('获取柜台数据失败:', error);
      }
    };
    onMounted(async() => {
      const res = await getCafeteria({cafeteriaId:cafeteriaId.value})
      cafeteria.value = res.data
      console.log('cafeteria:', cafeteria.value)
      try {
        const response = await getCountersOf({cafeteriaId})
        counters.value = response.data
      } catch (error) {
        console.error('获取柜台数据失败:', error)
      }
    })

    watch(cafeteriaId, (newId) => {
      fetchCafeteriaData(newId);
    });

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
