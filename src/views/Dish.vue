<template>
  <div>
    <header>
      <CafeteriaHeader :selectedCafeteria=cafeteriaId></CafeteriaHeader>
    </header>
    <h1>{{ dish.name }}</h1>
    <p>{{ dish.description }}</p>
    <p>价格：{{ dish.price }}元</p>
    <button @click="addToFavorites(dish.id)">收藏</button>
  </div>
</template>

<script>
import CafeteriaHeader from '@/components/CafeteriaHeader.vue';

export default {
  name: 'Dish',
  components: {
    CafeteriaHeader,
  },
  data() {
    return {
      dish: {}
    };
  },
  computed: {
    dishId() {
      return this.$route.params.dishId;
    },
    cafeteriaId() {
      return this.$route.params.cafeteriaId;
    }
  },
  created() {
    // 从后端 API 获取指定菜肴的详细信息
    // axios.get(`/api/dish/${this.dishId}`).then(response => {
    //   this.dish = response.data;
    // });
  },
  methods: {
    addToFavorites(dishId) {
      // 收藏菜肴的逻辑
    }
  }
};
</script>
