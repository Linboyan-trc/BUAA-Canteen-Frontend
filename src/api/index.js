import http from "@/utils/https";

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