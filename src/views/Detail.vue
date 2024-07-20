<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import PostDetail from "@/components/PostDetail.vue";
import { controlDetail } from "@/store/controlDetail";
import { useUserStore } from "@/store/user";
export default {
  name: "Detail",
  components: {
    PostDetail,
  },
  setup() {
    const route = useRoute();
    const userStore = useUserStore();
    const Detail = controlDetail();
    const detail = Detail.detail;
    // 评论内容
    const content = Detail.content;
    const getDetail = () => Detail.getDetail(route.params.dishId); // 使用正确的路由参数名
    const afterDoComment = (comment) => Detail.afterDoComment(comment);

    onMounted(() => getDetail());
    return { detail, afterDoComment, content };
  }
}
</script>

<template>
  <div class="box">
    <PostDetail :detail="detail" @afterDoComment="afterDoComment" v-if="detail.id" />
  </div>
</template>

<style scoped>
.box {
  position: absolute;
  left: 120px;
  top: 5px;
  border-radius: 0.8rem;
  width: 1200px;
  height: 600px;
}
</style>