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
        // const res = await postDetail({id});
    const res = {
      "data": {
        "title": "分享今日学习",
        "id": 119,
        "imgs": ["/banfan.jpg", "/friedPrawn.jpg", "/garlicFish.jpg"],
        "user": {
          "id": 12,
          "username": "测试用户1",
          "avatar": "/friedPrawn.jpg"
        },
        "createTime": "2023-07-27 18:03",
        "collectCount": 1,
        "ateCount": 2,
        "commentCount": 0,
        "content": "今天是2024/07/20此处是文本内容此处是文本内容此处是文本内容此处是文本内容此处是文本内容此处是文本内容此处是文本内容"
      }
    };
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
