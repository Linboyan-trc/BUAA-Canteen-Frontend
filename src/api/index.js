import http from "@/utils/http";

// 获取食堂相关api
export { getAllCafeterias, getAllDishes, getCafeteria, getCountersOf, getCounter, getDishes } from './cafeteria';
//获取用户登录注册相关api
export { login, getUserActionInfo, refreshAccessToken, register, logout, deleteAccount, updateUserAvatar, updateUserInfo, updateUserPassword } from './user';

// 主评
export const doComment = ({ data }) => {
    return http({
        url: ' comment/main/',
        method: 'POST',
        data: data
    })
}

// 回复主评
export const doReplyComment = ({ data }) => {
    return http({
        url: 'comment/reply/',
        method: 'POST',
        data: data
    })
}

// 用户收藏帖子
export const doCollectDish = ({ id }) => {
    // return http({
    //     url: 'user/collect-post/',
    //     method: 'POST',
    //     data: {id}
    // })
    return {
        "success": true,
        "data": {
            "info": "成功添加收藏"
        }
    }
}

// 用户收藏的柜台
export const doCollectCounter = ({ id }) => {
    return http({
        url: 'user/collect-counter/',
        method: 'POST',
        data: { id }
    })
}

// 用户收藏的食堂
export const doCollectCafeteria = ({ id }) => {
    return http({
        url: 'user/collect-cafeteria/',
        method: 'POST',
        data: { id }
    })
}

//用户取消收藏帖子
export const cancelCollectDish = ({ id }) => {
    // return http({
    //     url: 'user/uncollect-post/',
    //     method: 'DELETE',
    //     data: {id}
    // })
    return {
        "success": true,
        "data": {
            "info": "成功取消收藏"
        }
    }
}

//用户取消收藏的柜台
export const cancelCollectCounter = ({ id }) => {
    return http({
        url: 'user/uncollect-counter/',
        method: 'DELETE',
        data: { id }
    })
}

//用户取消收藏的食堂
export const cancelCollectCafeteria = ({ id }) => {
    return http({
        url: 'user/uncollect-cafeteria/',
        method: 'DELETE',
        data: { id }
    })
}

//用户吃过菜品
export const doAte = ({ id }) => {
    // return http({
    //     url: 'user/ate/',
    //     method: 'POST',
    //     data: {id}
    // })
    return {
        "success": true,
        "data": {
            "info": "成功添加吃过"
        }
    }
}

//用户取消吃过菜品
export const cancelAte = ({ id }) => {
    // return http({
    //     url: 'user/no-ate/',
    //     method: 'DELETE',
    //     data: {id}
    // })
    return {
        "success": true,
        "data": {
            "info": "成功取消吃过"
        }
    }
}

export const getComment = ({ id, offset }) => {
    // return http({
    //     url: '/comment/get-main/',
    //     method: 'POST',
    //     data: {
    //         id,
    //         offset
    //     }
    // })
    return {
        "success": true,
        "data": {
            "info": [
                {
                    "id": 127,
                    "content": "123",
                    "createTime": "2023-07-27 21:51",
                    "user": {
                        "id": 9,
                        "username": "回锅炒辣椒",
                        "avatar": "/friedPrawn.jpg"
                    },
                    "replyCount": 1,
                    "replies": []
                }
            ]
        }
    }
}

export const loadReplies = ({ id, offset }) => {
    // return http({
    //     url: '/comment/get-reply/',
    //     method: 'POST',
    //     data: {
    //         id,
    //         offset
    //     }
    // })
    return {
        "success": true,
        "data": {
            "info": [
                {
                    "id": 128,
                    "content": "123",
                    "createTime": "2023-07-27 21:53",
                    "user": {
                        "id": 9,
                        "username": "回锅炒辣椒",
                        "avatar": "https://q3.itc.cn/q_70/images03/20240420/fc837bd20e2e47f9acecb2c822df298c.jpeg"
                    }
                }
            ],
            "count": 1
        }
    };
}

// 帖子详情
export const postDetail = ({ id }) => {
    // return http({
    //     url: '/post/detail/',
    //     method: 'GET',
    //     data: {
    //         id
    //     }
    // })
    return {
        "sucess": true,
        "data": {
            "data": {
                "title": "分享今日学习",
                "id": 119119119119119,
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
            }
        }
    };
}

// 获取首页推荐帖子
export const queryPost = ({ offset, query }) => {
    // return http({
    //     url: '/post/recommend/',
    //     method: 'GET',
    //     data: {offset, query}
    // })
    return {
        "data": [
            {
                "id": 1,
                "name": "鱼香肉丝",
                "img": 'https://ww4.sinaimg.cn/mw690/75a4348fgy1hqvyz3mnscj20u0140wl9.jpg',
                "collectCount": 10,
                "ateCount": 20,
                "user": {
                    "id": 2,
                    "avatar": "https://ww1.sinaimg.cn/mw690/0073ozWdly1hr3qefka09j30u00u0ke0.jpg",
                    "username": "测试用户2"
                }
            },
            {
                "id": 2,
                "name": "糖醋里脊",
                "img": 'https://ww4.sinaimg.cn/mw690/75a4348fgy1hqvyz3mnscj20u0140wl9.jpg',
                "collectCount": 10,
                "ateCount": 15,
                "user": {
                    "id": 1,
                    "avatar": "https://ww1.sinaimg.cn/mw690/0073ozWdly1hr3qefka09j30u00u0ke0.jpg",
                    "username": "测试用户1"
                }
            }
        ]
    }
}

export const controlUserCollectOrLike = ({ post_id, operator, type }) => {
    return http({
        url: '/post/control/',
        method: 'POST',
        data: {
            post_id,
            type,
            operator
        }
    })
}

// 访问用户主页
export const queryUserIndex = ({}) => {
    return http({
        // url: '/user/get-info-by-id',
        url: '/user/get-info',
        method: 'GET',
        data: {
            // id
        }
    })
    // return { 
    //     data: {
    //         id: 9,
    //         username: "回锅炒辣椒",
    //         email: "123456@qq.com",
    //         student_id: "22370000",
    //         avatar: "/friedPrawn.jpg",
    //         introduction: "I love Rose~",
    //         gender: 'female',
    //     }
    // }
}

//查询用户收藏或吃过
export const queryUserPost = ({user_id, types, offset}) => {
    if (types == '收藏的菜肴') {
        return http({
            url: '/user/get-collect-dishes-list',
            method: 'GET',
            data: {
                offset
            }
        })
    } else if (types == '收藏的柜台') {
        return http({
            url: '/user/get-collect-counters-list',
            method: 'GET',
            data: {
                offset
            }
        })
    } else if (types == '收藏的食堂') {
        return http({
            url: '/user/get-collect-cafeterias-list',
            method: 'GET',
            data: {
                offset
            }
        })
    } else if (types == '吃过') {
        return http({
            url: '/user/get-ate-list',
            method: 'GET',
            data: {
                offset
            }
        })
    } else if (types == '帖子') {
        return http({
            url: '/user/get-post-list',
            method: 'GET',
            data: {
                offset
            }
        })
    }
}

export const uploadPost = (data) => {
    return http({
        url: 'post/upload/info/',
        method: 'POST',
        data: data
    })
}

export const postDelete = ({ id }) => {
    return http({
        url: '/post/delete/',
        method: 'POST',
        data: {
            id
        }
    })
}