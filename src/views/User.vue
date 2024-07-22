<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import Preview from "@/components/Preview.vue";
import { logout, queryUserIndex, queryUserPost, updateUserAvatar, updateUserPassword} from "@/api/index.js";
import {controlDetail} from "@/store/controlDetail";
import {onClickOutside} from "@vueuse/core";

const route = useRoute()
const Details = controlDetail()
import EditUserInfoModal from '@/components/EditUserInfoModal.vue'
import { updateUserInfo } from "@/api/index.js";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";
// 加载用户信息 //////////////////////////////////////////////////////////////
const userInfo = ref({})
const getUserInfo = async () => {
  const id = route.params.id
  const res = await queryUserIndex({id})
  userInfo.value = res.data
  document.title = res.data.username + '的小蓝书'
}
const userStore = useUserStore()
// 加载用户信息结束 ////////////////////////////////////////////////////////////

// 主页切换标签 //////////////////////////////////////////////////////////////
const radio = ref('收藏')
const userPost = ref([])
const userCollect = ref([])
const userAte = ref([])
const disabled = ref(true); // 初始禁用滚动加载
const showEditModal = ref(false)

const doUpdate = async(updatedInfo) => {
  // 处理更新逻辑，例如调用 API 更新用户信息
  const username = updatedInfo.username;
  const email = updatedInfo.email;
  const gender = updatedInfo.gender;
  const introduction = updatedInfo.introduction;
  const student_id = updatedInfo.student_id;
  const oldPassword = updatedInfo.oldPassword;
  const newPassword = updatedInfo.password;
  const avatar = updatedInfo.avatar;
  const isModified = username !== null && username !== userStore.userInfo.username 
          || introduction !== null && introduction !== userStore.userInfo.introduction;
  const isAvatarUploaded = avatar !== userStore.userInfo.avatar;
  const isPasswordModified = newPassword !== userStore.userInfo.password;
  if (!isModified && !isAvatarUploaded && !isPasswordModified) {
    ElMessage({type: 'warning', message: '未作任何修改！'});
    return;
  }
  if (isModified && !isAvatarUploaded) {
    const msg = await updateUserInfo({username, email, gender, introduction, student_id});
    avatar.value = userStore.userInfo.avatar;
    userStore.changeInfo({username, email, gender, introduction, student_id, avatar})
    ElMessage({message: msg});
  } else if (!isModified && isAvatarUploaded) {
    const res = updateUserAvatar({avatar});
    userStore.changeInfo({username, email, gender, introduction, student_id, avatar});
    ElMessage({message: res.message});
  } else {
    const msg = await updateUserInfo({username, email, gender, introduction, student_id});
    const res = updateUserAvatar({avatar});
    userStore.changeInfo({username, email, gender, introduction, student_id, avatar});
    ElMessage({message: msg + res.message});
  }

  if (isPasswordModified) {
    const msg = await updateUserPassword({oldPassword, newPassword});
    ElMessage({message: msg});
  }
  console.log('Updated user info:', updatedInfo)
}

getUserInfo()
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
  const user_id = userInfo.value.id;
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
  <div id="logout">
    <ConfirmModal :exeName="'退出登录'"/>
    <ConfirmModal :exeName="'注销账号'"/>
  </div>
  <div class="userInfo" v-if="userInfo">
    <el-row :gutter="10">
      <el-col :span="12" style="width: 200px;">
        <el-avatar :size="200" :src="userInfo.avatar"></el-avatar>
      </el-col>
      <el-col :span="12" style="width: 250px!important;">
        <h2>{{ userInfo.username }}</h2>
        <p>学号：{{ userInfo.student_id }}</p>
        <p>个性签名：{{ userInfo.introduction }}</p>
        <p v-if="userInfo.gender === 'female'">性别：女</p>
        <p v-else-if="userInfo.gender === 'male'">性别：男</p>
        <p v-else-if="userInfo.gender === null">性别：还没有设置性别</p>
      </el-col>
    </el-row>
  </div>
  <div class="editUserInfo">
    <button @click="showEditModal = true" class="userBtn">编辑用户信息</button>
    <EditUserInfoModal
      :userInfo="userInfo"
      :showModal="showEditModal"
      @update:showModal="showEditModal = $event"
      @doUpdate="doUpdate"
    />
  </div>
  <div class="checkBox" @change="Toggle">
    <el-radio-group v-model="radio" size="large" class="radio-group">
      <el-radio-button class="radio" label="收藏" :value='收藏' name="collect"/>
      <el-radio-button class="radio" label="吃过" :value='吃过' name="ate"/>
      <el-radio-button class="radio" label="帖子" :value='帖子' name="post"/>
    </el-radio-group>
  </div>
  <div style="margin-top: 30px;" v-if="userInfo">
    <div v-if="radio === '收藏'">
      <div v-if="userCollect.length === 0">
        <el-empty description="现在还没有收藏..."/>
      </div>
      <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-delay="200"
           :infinite-scroll-distance="100"
           v-else>
           <div class="dishes-preview" v-for="collect in userCollect">
            <div v-if="collect.type === 'dish'">
              <div :key="collect.id">
                <Preview :preview="collect" />
              </div>
            </div>
            <div v-else-if="collect.type === 'cafe'">
              
            </div>
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
#logout {
  margin-top: 10px;
  margin-right: 10px;
  float: right;
}

.editUserInfo {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

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
  margin-top: 30px;
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