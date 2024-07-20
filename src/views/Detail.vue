<script>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PostDetail from "@/components/PostDetail.vue";
import { controlDetail } from "@/store/controlDetail";
import { useUserStore } from "@/store/user";
import { Close } from '@element-plus/icons-vue';

export default {
  name: "Detail",
  components: {
    PostDetail,
    Close,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const Detail = controlDetail();
    const detail = Detail.detail;
    // 评论内容
    const content = Detail.content;
    const getDetail = () => Detail.getDetail(route.params.dishId); // 使用正确的路由参数名
    const afterDoComment = (comment) => Detail.afterDoComment(comment);

    const closeDetail = () => {
      router.back();
    };

    onMounted(() => getDetail());
    return { detail, afterDoComment, content, closeDetail };
  }
}
</script>

<template>
  <div class="box">
    <PostDetail :detail="detail" @afterDoComment="afterDoComment" v-if="detail.id" />
    <div class="close-button" @click="closeDetail">
      <el-icon>
        <Close />
      </el-icon>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: absolute;
  left: 50px;
  top: 5px;
  border-radius: 0.8rem;
  width: 1200px;
  height: 600px;
}

.close-button {
  color: #4274b9;
  position: absolute;
  top: 20px;
  left: 1190px;

  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  font-size: 2.5rem;
}

.close-button:hover {
  transform: rotate(90deg);
}

.close-button > svg {
  width: 25px;
  height: 25px;
  stroke-width: 2;
}
</style>
