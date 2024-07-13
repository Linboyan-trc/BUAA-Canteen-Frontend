<template>
  <div>
    <h1>{{ cafeteriaName }}食堂</h1>
    <ul>
      <li v-for="counter in counters" :key="counter.id">
        <router-link :to="`/cafeteria/${cafeteria}/counter/${counter.id}`">{{ counter.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Cafeteria',
  data() {
    return {
      counters: []
    };
  },
  computed: {
    cafeteria() {
      return this.$route.params.cafeteria;
    },
    cafeteriaName() {
      const cafeteriaMap = {
        student1: '学一',
        student2: '学二',
        student3: '学三',
        student4: '学四',
        student5: '学五',
        student6: '学六',
        teacher: '教工',
        halal: '清真',
        heyi: '合一'
      };
      return cafeteriaMap[this.cafeteria];
    },
  },
  created() {
    // 从后端 API 获取指定食堂的窗口数据
    // 例：axios.get(`/api/cafeteria/${this.cafeteria}/counters`).then(response => {
    //   this.counters = response.data;
    // });
  }
};
</script>
