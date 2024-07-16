<template>
    <div class="app-container">
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="搜索菜品..." />
            <button @click="fetchRecommendedDishes">搜索</button>
        </div>
        <div class="recommendations-container">
            <h2>随机推荐菜品</h2>
            <ul>
                <li v-for="dish in recommendedDishes" :key="dish.id">{{ dish.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            searchQuery: '',
            recommendedDishes: [
                { id: 1, name: '宫保鸡丁' },
                { id: 2, name: '鱼香肉丝' },
                { id: 3, name: '麻婆豆腐' },
                { id: 4, name: '糖醋排骨' },
                { id: 5, name: '红烧肉' }
            ]
        };
    },
    created() {
        // 模拟从服务器获取随机推荐的菜品
        this.fetchRecommendedDishes();
    },
    methods: {
        fetchRecommendedDishes() {
            // 这里可以添加从服务器获取数据的逻辑
            // 例如：axios.get('/api/dishes/recommended').then(response => { this.recommendedDishes = response.data; });
        }
    }
};
</script>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-container {
    width: 100%;
    margin-bottom: 20px;
}

.search-container input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.recommendations-container {
    width: 100%;
}

.recommendations-container h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.recommendations-container ul {
    list-style-type: none;
    padding: 0;
}

.recommendations-container li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}
</style>