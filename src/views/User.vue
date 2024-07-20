<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import DishPreview from "@/components/DishPreview.vue";
import { queryUserIndex, queryUserPost} from "@/api/index.js";
import {controlDetail} from "@/store/controlDetail";
import {onClickOutside} from "@vueuse/core";

const route = useRoute()
const Details = controlDetail()

// 加载用户信息 //////////////////////////////////////////////////////////////
const userInfo = ref({})
const getUserInfo = async () => {
  const id = route.params.id
  const res = await queryUserIndex({id})
  userInfo.value = res.data
  document.title = res.data.user.username + ' .Dlock'
}
// 加载用户信息结束 ////////////////////////////////////////////////////////////

// 主页切换标签 //////////////////////////////////////////////////////////////
const radio = ref('收藏')
const userPost = ref([])
const userCollect = ref([])
const userAte = ref([])
const disabled = ref(true); // 初始禁用滚动加载

const Toggle = async () => {
  const user_id = route.params.id
  const offset = 0
  const types = radio.value
  if (radio.value === '收藏' && userCollect.value.length === 0) {
    const post = await queryUserPost({user_id, types, offset})
    userCollect.value = post.info
  } else if (radio.value === '吃过' && userAte.value.length === 0) {
    const post = await queryUserPost({user_id, types, offset})
    userAte.value = post.info
  } else if (radio.value === '帖子' && userPost.value.length === 0) {
    const post = await queryUserPost({user_id, types, offset})
    userPost.value = post.info
  }
  disabled.value = false;
}
const load = async () => {
  disabled.value = true;
  const user_id = userInfo.value.user.id;
  const types = radio.value;
  if (types === '帖子') {
    const offset = userPost.value.length;
    const post = await queryUserPost({user_id, types, offset});
    if (post.info.length === 0) {
      disabled.value = true;
    } else {
      userPost.value = [...userPost.value, ...post.info];
      disabled.value = false;
    }
  } else if (types === '吃过') {
    const offset = userAte.value.length;
    const ate = await queryUserPost({user_id, types, offset});
    if (ate.info.length === 0) {
      disabled.value = true;
    } else {
      userAte.value = [...userAte.value, ...ate.info];
      disabled.value = false;
    }
  } else if (types === '收藏') {
    const offset = userCollect.value.length;
    const collect = await queryUserPost({user_id, types, offset});
    if (collect.info.length === 0) {
      disabled.value = true;
    } else {
      userCollect.value = [...userCollect.value, ...collect.info];
      disabled.value = false;
    }
  }
};
// 主页切换标签结束 ///////////////////////////////////////////////////////////

// 卡片详情页的内容 //////////////////////////////////////////////////////////
const overlayX = ref(0); // 覆盖层的水平位置
const overlayY = ref(0); // 覆盖层的垂直位置

let style = null;
const onBeforeEnter = () => {
  style = document.createElement('style')
  style.innerHTML =
      `@keyframes scale-up-center {
          0% {
            transform: scale(0.5);
            transform-origin: ${overlayX.value}px ${overlayY.value}px;
          }
          100% {
            transform: scale(1);
          }
       }`
  document.head.appendChild(style);
}

const onAfterEnter = (el) => {
  el.style = 'background-color: #fff'
  const button = el.querySelector('.backPage')
  button.style.display = ''
}
const onBeforeLeave = (el) => {
  const button = el.querySelector('.backPage')
  button.style.display = 'none'
  el.style = 'background-color: transparent'
}

const onAfterLeave = () => {
  if (style) {
    document.head.removeChild(style);
    style = null;
  }
}
// 卡片详情页的内容结束 //////////////////////////////////////////////////////////

onMounted(async () => {
  await getUserInfo()
  await Toggle()
})
</script>

<template>
  <h3>用户中心</h3>
  <div class="userInfo" v-if="userInfo.user">
    <el-row :gutter="10">
      <el-col :span="12" style="width: 100px;">
        <el-avatar :size="150" :src="userInfo.user.avatar"></el-avatar>
      </el-col>
      <el-col :span="12" style="width: 250px!important;">
        <h2>{{ userInfo.user.username }}</h2>
        <p>{{ userInfo.user.signature }}</p>
      </el-col>
    </el-row>
  </div>
  <div class="checkBox" @change="Toggle">
    <el-radio-group v-model="radio" size="large" class="radio-group">
      <el-radio-button class="radio" label="收藏" :value='收藏' name="collect"/>
      <el-radio-button class="radio" label="吃过" :value='吃过' name="ate"/>
      <el-radio-button class="radio" label="帖子" :value='帖子' name="post"/>
    </el-radio-group>
  </div>
  <div style="margin-top: 30px;" v-if="userInfo.user">
    <div v-if="radio === '收藏'">
      <div v-if="userCollect.length === 0">
        <el-empty description="现在还没有收藏..."/>
      </div>
      <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-delay="200"
           :infinite-scroll-distance="100"
           v-else>
           <div class="dishes-preview">
            <router-link v-for="dish in userCollect" :key="dish.id" :to="`/dish/${dish.id}`">
              <DishPreview :dish="dish" />
            </router-link>
          </div>
      </div>
      <transition
          name="fade"
          @before-enter="onBeforeEnter"
          @after-enter="onAfterEnter"
          @before-leave="onBeforeLeave"
          @after-leave="onAfterLeave"
      >
      </transition>
    </div>
    <div v-else-if="radio === '吃过'">
      <div v-if="userAte.length === 0">
        <el-empty description="现在还没有吃过..."/>
      </div>
      <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-delay="200"
           :infinite-scroll-distance="100"
           v-else>
           <div class="dishes-preview">
            <router-link v-for="dish in userAte" :key="dish.id" :to="`/dish/${dish.id}`">
              <DishPreview :dish="dish"/>
            </router-link>
          </div>
      </div>
      <transition
          name="fade"
          @before-enter="onBeforeEnter"
          @after-enter="onAfterEnter"
          @before-leave="onBeforeLeave"
          @after-leave="onAfterLeave"
      >
      </transition>
    </div>
    <div v-else-if="radio === '帖子'">
      <div v-if="userPost.length === 0">
        <el-empty description="现在还没有帖子..."/>
      </div>
      <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-delay="200"
           :infinite-scroll-distance="100"
           v-else>
           <div class="dishes-preview">
            <router-link v-for="dish in userPost" :key="dish.id" :to="`/dish/${dish.id}`">
              <DishPreview :dish="dish" />
            </router-link>
          </div>
      </div>
      <transition
          name="fade"
          @before-enter="onBeforeEnter"
          @after-enter="onAfterEnter"
          @before-leave="onBeforeLeave"
          @after-leave="onAfterLeave"
      >
      </transition>
    </div>
  </div>
</template>

<style scoped>
h3 {
    margin: 0;
    padding: 10px;
    background-color: #4274b9;
    color: white;
    text-align: center;
}

.userInfo {
  /* background-color: brown; */
  display: flex;
  width: 100%;
  /* align-items: center; */
  justify-content: center;
  margin-top: 20px;
}

.checkBox {
  /* background-color: brown; */
  margin-top: 50px;
}

.radio-group {
  display: flex;
  justify-content: center;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.backPage {
  position: fixed;
  top: 5%;
  left: 3%;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all .3s;
}

.fade-enter-active {
  animation: scale-up-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.fade-leave-active {
  animation: scale-up-center 0.5s linear both reverse;
}
</style>