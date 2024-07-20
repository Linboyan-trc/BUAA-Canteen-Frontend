<template>
    <div class="app-container">
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="搜索菜品..." />
            <button @click="fetchRecommendedPosts">搜索</button>
        </div>

        <div class="recommendations-container">
            <router-link v-for="_ in recommendedPosts" :key="_.id" :to="`/dish/${_.id}`">
                <DishPreview :dish = _ />
            </router-link>
        </div>

        <div class="icon-button refresh-button" @click="refreshPage">
            <i class="fas fa-sync-alt"></i>
            <span class="tooltip">刷新</span>
        </div>
        <div class="icon-button back-to-top-button" @click="scrollToTop">
            <i class="fas fa-arrow-up"></i>
            <span class="tooltip">回到顶部</span>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { queryPost } from '@/api';
import DishPreview from '@/components/DishPreview.vue';

export default {
    name: 'Home',
    components: {
        DishPreview
    },
    setup() {
        const searchQuery = ref('');
        const recommendedPosts = ref([]);

        // Sample data
        recommendedPosts.value = [
            {
                "name": "分享今日学习",
                "id": 119,
                "img": "https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333",
                "img_info": {
                    "height": 1706,
                    "width": 1280
                },
                "load": false,
                "user": {
                    "id": 12,
                    "username": "测试用户1",
                    "avatar": "http://localhost:8000/static/img/avatar/12-Snipaste_2023-07-17_15-39-14.png"
                },
                "collectCount": 0,
                "ateCount": 0
            },
            {
                "name": "求解！！",
                "id": 118,
                "img": "https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333",
                "img_info": {
                    "height": 2560,
                    "width": 1920
                },
                "load": false,
                "user": {
                    "id": 12,
                    "username": "测试用户1",
                    "avatar": "http://localhost:8000/static/img/avatar/12-Snipaste_2023-07-17_15-39-14.png"
                },
                "collectCount": 0,
                "ateCount": 0
            },
            {
                "name": "python学习",
                "id": 117,
                "img": "https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333",
                "img_info": {
                    "height": 1707,
                    "width": 1280
                },
                "load": false,
                "user": {
                    "id": 12,
                    "username": "测试用户1",
                    "avatar": "http://localhost:8000/static/img/avatar/12-Snipaste_2023-07-17_15-39-14.png"
                },
                "collectCount": 0,
                "ateCount": 0
            },
            {
                "name": "好漂亮！！！",
                "id": 116,
                "img": "https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333",
                "img_info": {
                    "height": 960,
                    "width": 960
                },
                "load": false,
                "user": {
                    "id": 12,
                    "username": "测试用户1",
                    "avatar": "http://localhost:8000/static/img/avatar/12-Snipaste_2023-07-17_15-39-14.png"
                },
                "collectCount": 0,
                "ateCount": 0
            },
            {
                "name": "可爱可爱",
                "id": 115,
                "img": "https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333",
                "img_info": {
                    "height": 1350,
                    "width": 1080
                },
                "load": false,
                "user": {
                    "id": 12,
                    "username": "测试用户1",
                    "avatar": "http://localhost:8000/static/img/avatar/12-Snipaste_2023-07-17_15-39-14.png"
                },
                "collectCount": 0,
                "ateCount": 0
            }
        ]
        const fetchRecommendedPosts = async () => {
            try {
                const response = await queryPost({ offset: 0, query: searchQuery.value });
                recommendedPosts.value = response.info;
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        const refreshPage = () => {
            window.location.reload();
        };

        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        onMounted(() => {
            // fetchRecommendedPosts();
        });

        return {
            searchQuery,
            recommendedPosts,
            fetchRecommendedPosts,
            refreshPage,
            scrollToTop
        };
    }
}
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';

.app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative; /* Add this to position the buttons */
}

.search-container {
    display: flex;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.search-container input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.search-container button {
    padding: 10px;
    font-size: 16px;
    border: none;
    background-color: #4274b9;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 10px; /* Add some space between input and button */
}

.recommendations-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0px;
}

.icon-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background-color: #4274b9;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    margin-bottom: 10px; /* Add some space between the buttons */
}

.refresh-button {
    right: 80px; /* Adjust position to avoid overlapping with back-to-top button */
}

.icon-button:hover {
    background-color: #0056b3;
}

.icon-button .tooltip {
    position: absolute;
    bottom: 50px;
    right: 50%;
    transform: translateX(50%);
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.icon-button:hover .tooltip {
    opacity: 1;
    visibility: visible;
}
</style>