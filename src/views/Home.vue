<template>
    <div class="app-container bg">
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="搜索菜品..." />
            <button @click="fetchPosts">搜索</button>
        </div>

        <div class="recommendations-container">
            <div v-for="post in posts" :key="post.id">
                <Preview :name="'dish'" :preview="post" />
            </div>
        </div>

        <div class="icon-button refresh-button" @click="refreshPage">
            <i class="fas fa-sync-alt"></i>
            <span class="tooltip">刷新</span>
        </div>
        <div class="icon-button back-to-top-button" @click="scrollToTop">
            <i class="fas fa-arrow-up"></i>
            <span class="tooltip">回到顶部</span>
        </div>
        <div id="particles-js"></div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { queryPost, queryPostBySearch } from '@/api';
import Preview from '@/components/Preview.vue';

export default {
    name: 'Home',
    components: {
        Preview
    },
    setup() {
        const searchQuery = ref('');
        const posts = ref([]);

        const fetchPosts = async () => {
            try {
                let response;
                if (searchQuery.value) {
                    response = await queryPostBySearch({ offset: 0, query: searchQuery.value });
                } else {
                    response = await queryPost({ offset: 0 });
                }
                posts.value = response.data.posts;
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
            fetchPosts();
            const script = document.createElement('script');
            script.src = '/src/utils/particles.js';
            script.onload = () => {
                particlesJS.load('particles-js', '/particles.json', function () {
                    console.log('particles.js loaded - callback');
                });
            };
            document.body.appendChild(script);
        });

        return {
            searchQuery,
            posts,
            fetchPosts,
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
    position: relative;
    align-items: center; 
}

.search-container {
    display: flex;
    width: 100%;
    max-width: 900px; 
    margin-top: 20px;
    margin-bottom: 20px;
    align-self: center;
    position: fixed;
    top: 0;
    z-index: 1000; /* 设置较高的z-index值，使搜索栏位于其他内容之上 */
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
    margin-left: 10px;
}

.search-container button:hover {
    background-color: #0056b3;
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
    margin-bottom: 10px;
}

.refresh-button {
    right: 80px;
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


.bg {
  background-image: url('https://buaaxiaolanshu.oss-cn-beijing.aliyuncs.com/static/bg-login.svg');
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#particles-js {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
