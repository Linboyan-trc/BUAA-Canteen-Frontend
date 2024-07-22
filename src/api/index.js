import http from "@/utils/http";

// 获取某食堂的全部柜台
export const getCounters = ({cafeteria}) => {
    return http({
        url: '/cafeteria/get-counters',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            cafeteria
        }
    })
}

//获取某柜台的全部菜肴
export const getDishes = ({cafeteria, counterId}) => {
    return http({
        url: '/cafeteria/counter/get-dishes',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            cafeteria,
            counterId
        }
    })
}

//获取所有窗口和菜肴
export const getAllDishes = () => {
    return http({
        url: '/cafeteria/get-all-dishes',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            
        }
    })
}

// 登录
export const login = ({email, password}) => {
    return http({
        url: 'user/login/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email,
            password
        }
    })
}

export const refreshAccessToken = (refreshToken) => {
  return http.post('/user/refresh-token', {}, {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });
};


// 注册
export const register = ({email, username, password}) => {
    return http({
        url: 'user/register/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            username,
            password,
            email
        }
    })
}

//登出
export const logout = ({}) => {
    return http({
        url: 'user/logout/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

//注销账号
export const deleteAccount = ({}) => {
    return http({
        url: 'user/delete/',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

// 评论帖子
export const doComment = ({data}) => {
    return http({
        url: 'user/comment/',
        method: 'POST',
        data: data
    })
}

// 用户收藏
export const doCollect = ({id}) => {
    return http({
        url: 'user/collect/',
        method: 'POST',
        data: {id}
    })
}

//用户取消收藏
export const cancelCollect = ({id}) => {
    return http({
        url: 'user/uncollect/',
        method: 'DELETE',
        data: {id}
    })
}

//用户吃过菜品
export const doAte = ({id}) => {
    return http({
        url: 'user/ate/',
        method: 'POST',
        data: {id}
    })
}

//用户取消吃过菜品
export const cancelAte = ({id}) => {
    return http({
        url: 'user/no-ate/',
        method: 'DELETE',
        data: {id}
    })
}

export const getComment = ({id, offset}) => {
    return http({
        url: '/comment/main/',
        method: 'POST',
        data: {
            id,
            offset
        }
    })
}

export const loadReplies = ({id, offset}) => {
    // return http({
    //     url: '/comment/reply/',
    //     method: 'POST',
    //     data: {
    //         id,
    //         offset
    //     }
    // })
    return {
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
    };
}

// 帖子详情
export const postDetail = ({id}) => {
    // return http({
    //     url: '/post/detail/',
    //     method: 'POST',
    //     data: {
    //         id
    //     }
    // })
    return {
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
          "content": "今天是2024/07/20此处是文本内容此处是文本内容此处是文本内容此处是文本内容此处是文本内容此处是文本内容此处是文本内容"
        }
      };
}

// 主页帖子
export const queryPost = ({offset, query}) => {
    return http({
        url: '/post/',
        method: 'POST',
        data: {offset, query}
    })
}

export const controlUserCollectOrLike = ({post_id, operator, type}) => {
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
export const queryUserIndex = ({id}) => {
    // return http({
    //     url: '/user/get-info-by-id',
    //     method: 'GET',
    //     data: {
    //         id
    //     }
    // })
    return { 
        data: {
            id: 9,
            username: "回锅炒辣椒",
            email: "123456@qq.com",
            student_id: "22370000",
            avatar: "/friedPrawn.jpg",
            introduction: "I love Rose~",
            gender: 'female',
        }
    }
}

//查询用户收藏或吃过
export const queryUserPost = ({user_id, types, offset}) => {
    // return http({
    //     url: '/user/post/',
    //     method: 'POST',
    //     data: {
    //         user_id,
    //         types,
    //         offset
    //     }
    // })
    //temp
    if (offset == 15) {
        return { info: [] }
    }
    if (types == '收藏') {
        return {
            info: [
                {
                    id: 1, name: '菜名', img: 'https://q3.itc.cn/q_70/images03/20240420/fc837bd20e2e47f9acecb2c822df298c.jpeg', collectCount: 10, ateCount: 20
                }
            ]
        }
    } else if (types == '吃过') {
        return {
            info: [
                {
                    id: 1, name: '菜名', img: 'https://ww4.sinaimg.cn/mw690/75a4348fgy1hqvyz3mnscj20u0140wl9.jpg', collectCount: 10, ateCount: 20,
                }
            ]
        }
    } else if (types == '帖子') {
        return { info: [] }
    }
}

//更新用户信息（文本）
export const updateUserInfo = ({username, email, gender, introduction, student_id}) => {
    return http({
        url: '/user/change-info/',
        method: 'PUT',
        data: {
            username: username,
            email: email,
            gender: gender,
            introduction: introduction,
            student_id: student_id
        }
    })
}

//更新用户头像
export const updateUserAvatar = ({avatar}) => {
    return http({
        url: '/user/change-avatar/',
        method: 'PUT',
        data: {
            avatar: avatar
        }
    })
}

//更新用户密码
export const updateUserPassword = ({oldPassword, newPassword}) => {
    return http({
        url: '/user/change-password/',
        method: 'POST',
        data: {
            old_password: oldPassword,
            new_password: newPassword
        }
    })
}

export const uploadPost = (data) => {
    return http({
        url: '/upload/info/',
        method: 'POST',
        data: data
    })
}

export const postDelete = ({id}) => {
    return http({
        url: '/post/delete/',
        method: 'POST',
        data: {
            id
        }
    })
}