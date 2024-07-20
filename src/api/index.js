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
        url: '/login/',
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


// 注册
export const Register = ({email, username, password}) => {
    return http({
        url: '/register/',
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
    return http({
        url: '/comment/reply/',
        method: 'POST',
        data: {
            id,
            offset
        }
    })
}

// 帖子详情
export const postDetail = ({id}) => {
    return http({
        url: '/post/detail/',
        method: 'POST',
        data: {
            id
        }
    })
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
    //     url: '/index/',
    //     method: 'POST',
    //     data: {
    //         id
    //     }
    // })
    return { 
        data: {
            user: {
                id: 9,
                username: "回锅炒辣椒",
                avatar: "/friedPrawn.jpg",
                signature: "I love Rose~",
                fans: 0,
                focusOn: 0,
                postsCount: 0
            }
        }
    }
}

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