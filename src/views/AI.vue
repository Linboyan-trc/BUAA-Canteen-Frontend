<template>
  <div class="container">
    <div class="content">
      <h1>问问 AI 吃什么</h1>
      <div class="chat-box">
        <div v-for="message in messages" :key="message.id" class="message">
          <div v-if="message.type === 'user'" class="user-message">{{ message.text }}</div>
          <div v-else class="ai-message">{{ message.text }}</div>
        </div>
      </div>
      <textarea v-model="userInput" placeholder="输入你的问题" @keydown.enter.prevent="askLLM"></textarea>
      <button @click="askLLM" :disabled="loading">询问 AI</button>
      <div v-if="loading" class="loading-spinner"></div>
      <button v-if="llmResponse" @click="searchPosts">使用回复搜索帖子</button>
    </div>
  </div>
</template>



<script>
import { useRouter } from "vue-router";
import { ref, onBeforeMount } from 'vue';
import { ai_chat } from '@/api/user.js';
import axios from 'axios';
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user.js";

export default {
  name: 'LLMChat',
  setup() {
    const router = useRouter();
    const userInput = ref('');
    const llmResponse = ref('');
    const loading = ref(false);
    const messages = ref([]);
    const userStore = useUserStore();

    const checkLogin = () => {
      if (!userStore.userInfo.username) {
        ElMessage({
          message: '请先登录',
          type: 'warning',
          duration: 2000,
        });
        router.replace('/login');
      }
    };

    onBeforeMount(() => {
      checkLogin();
    });

    const askLLM = async () => {
      if (!userInput.value.trim()) return;
      messages.value.push({ id: Date.now(), type: 'user', text: userInput.value });
      loading.value = true;
      try {
        const response = await ai_chat({ message: userInput.value });
        llmResponse.value = response.data.message;
        messages.value.push({ id: Date.now(), type: 'ai', text: response.data.message });
      } catch (error) {
        console.error('Error asking LLM:', error);
        ElMessage({
          message: '询问 AI 失败，请求超时或服务器问题',
          type: 'error',
          duration: 2000,
        });
      } finally {
        loading.value = false;
        userInput.value = '';
      }
    };

    const searchPosts = async () => {
      try {
        const response = await axios.get('/post/search', {
          params: {
            query: llmResponse.value,
          },
        });
        console.log('搜索结果:', response.data.posts);
      } catch (error) {
        console.error('Error searching posts:', error);
      }
    };

    return {
      userInput,
      llmResponse,
      askLLM,
      searchPosts,
      loading,
      messages,
    };
  },
};
</script>


<style scoped>
body, html {
  height: 100%;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0; /* 背景颜色 */
}

.content {
  background: white; /* 白色背景 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 600px;
}

h1 {
  margin-top: 0;
}

.chat-box {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
}

.user-message {
  text-align: right;
  color: blue;
}

.ai-message {
  text-align: left;
  color: green;
}

textarea {
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none; /* 禁止拉伸 */
}

button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #ccc;
}

button:hover:enabled {
  background-color: #0056b3;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border-left-color: #007BFF;
  animation: spin 1s ease infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

p {
  margin-top: 10px;
}
</style>


