<template>
    <div>
      <h1>{{ counterName }}</h1>
      <ul>
        <li v-for="dish in dishes" :key="dish.id">
          <router-link :to="`/dish/${dish.id}`">{{ dish.name }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Counter',
    data() {
      return {
        counterName: '',
        dishes: []
      };
    },
    computed: {
      counterId() {
        return this.$route.params.counterId;
      }
    },
    created() {
      // 从后端 API 获取指定窗口的菜肴数据和窗口名称
      // 例：axios.get(`/api/counter/${this.counterId}`).then(response => {
      //   this.counterName = response.data.name;
      //   this.dishes = response.data.dishes;
      // });
    }
  };
  </script>
  