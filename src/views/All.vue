<template>
  <div>
    <header v-if="showHeader">
      <CafeteriaHeader :selectedCafeteria="selectedCafeteriaId"></CafeteriaHeader>
    </header>
    <div v-if="!showHeader" class="cafeteria-preview-container">
      <h3>所有食堂</h3>
      <div class="cafeteria-previews">
        <div v-for="cafeteria in cafeterias" :key="cafeteria.id" @click="selectCafeteria(cafeteria.id)" class="cafeteria-preview">
          <CafeteriaPreview :cafeteria="cafeteria" />
        </div>
      </div>
    </div>
    <div v-if="showHeader" class="dishes-preview">
      <div v-for="dish in dishes" :key="dish.id">
        <Preview :name="'dish'" :preview="dish" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter} from 'vue-router';
import Preview from '@/components/Preview.vue';
import CafeteriaHeader from '@/components/CafeteriaHeader.vue';
import CafeteriaPreview from '@/components/preview/CafeteriaPreview.vue';
import { getAllCafeterias } from '@/api';

export default {
  name: 'All',
  components: {
    CafeteriaHeader,
    Preview,
    CafeteriaPreview
  },
  setup() {
    const dishes = ref([]);
    const cafeterias = ref([]);
    const showHeader = ref(false);
    const selectedCafeteriaId = ref(null);
    const router = useRouter();

    const fetchAllCafeterias = async () => {
      try {
        const response = await getAllCafeterias();
        cafeterias.value = response.data.info;
      } catch (error) {
        console.error('获取所有食堂数据失败:', error);
      }
    };

    const selectCafeteria = (cafeteriaId) => {
      selectedCafeteriaId.value = cafeteriaId;
      showHeader.value = true;
      router.push({ name: 'Cafeteria', params: { cafeteriaId } });
    };

    onMounted(() => {
      fetchAllCafeterias();
    });

    return {
      dishes,
      cafeterias,
      showHeader,
      selectedCafeteriaId,
      selectCafeteria
    };
  }
};
</script>


<style scoped>
.cafeteria-preview-container {
  text-align: center;
}

.cafeteria-preview-container h3 {
  margin: 0;
  padding: 10px;
  background-color: #4274b9;
  color: white;
  text-align: center;
}

.cafeteria-previews {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin: 20px 0;
}

.cafeteria-preview {
  box-sizing: border-box;
}

.cafeteria-preview:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dishes-preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
