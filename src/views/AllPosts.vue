<template>
    <div class="app-container">
        <div class='space'></div>
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
import { ref, onMounted, computed } from 'vue';
import { allPosts } from '@/api';
import Preview from '@/components/Preview.vue';
import 'particles.js';

export default {
    name: 'AllPosts',
    components: {
        Preview
    },
    setup() {
        const posts = ref([]);

        const fetchPosts = async () => {
            try {
                let response;
                response = await allPosts();
                posts.value = response.data.posts;
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        const refreshPage = () => {
            fetchPosts();
        };

        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        onMounted(() => {
            fetchPosts();
        });

        onMounted(() => {
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
            posts,
            fetchPosts,
            refreshPage,
            scrollToTop,
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
   min-height: 100%;
   background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
}


#particles-js {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.space {
    height: 100px;
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
</style>