import {ref} from "vue";
import {useUserStore} from "@/store/user";
import {postDetail} from "@/api/index";

export const controlDetail = () => {
  const detail = ref({});
  const comments = ref([]);
  const content = ref('');
  const userStore = useUserStore();

  const afterDoComment = () => {
    detail.value.commentCount += 1;
  };

  const getDetail = async (id) => {
    const res = await postDetail({id});
    detail.value = res.data;
    document.title = detail.value.title;
  };

  const setComment = (comment) => {
    comments.value = [...comments.value, ...comment];
  };

  return {
    detail,
    comments,
    content,
    afterDoComment,
    getDetail,
    setComment
  };
};
