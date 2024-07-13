<template>
    <div>
      <h1>{{ dish.name }}</h1>
      <p>{{ dish.description }}</p>
      <p>价格：{{ dish.price }}元</p>
      <button @click="addToFavorites(dish.id)">收藏</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dish',
    data() {
      return {
        dish: {}
      };
    },
    computed: {
      dishId() {
        return this.$route.params.dishId;
      }
    },
    created() {
      // 从后端 API 获取指定菜肴的详细信息
      // 例：axios.get(`/api/dish/${this.dishId}`).then(response => {
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
  