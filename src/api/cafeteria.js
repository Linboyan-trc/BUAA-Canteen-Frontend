import http from "@/utils/http";

//////////////////////////////////////// 1. cafeteira ////////////////////////////////////////
// 1. 获取所有食堂，食堂/所有柜台，柜台/所有菜品的管理员帖子，柜台/所有菜品
// 1. /cafeteria/get-all-cafeterias
// 1. /cafeteria/get-counters
// 1. /cafeteria/counter/get-dishes
// 1. /cafeteria/counter/get-dishes-no-posts
export const getAllCafeterias = () => {
    return http({
        url: '/cafeteria/get-all-cafeterias',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getCountersOf = ({cafeteriaId}) => {
    return http({
        url: '/cafeteria/get-counters',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            cafeteriaId: Number(cafeteriaId)
        }
    })
}

export const getDishes = ({counterId}) => {
    return http({
        url: '/cafeteria/counter/get-dishes',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            counterId: Number(counterId)
        }
    })
}

export const getDishesNoPosts = ({counterId}) => {
    return http({
        url: '/cafeteria/counter/get-dishes-no-posts',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            counterId: Number(counterId)
        }
    })
}
//////////////////////////////////////////////////////////////////////////////////////////
//获取某食堂的信息
export const getCafeteria = ({cafeteriaId}) => {
    return http({
        url: '/cafeteria/get-cafeteria',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            cafeteriaId: Number(cafeteriaId)
        }
    })
}

// 获取某柜台的信息
export const getCounter = ({counterId}) => {
    return http({
        url: '/cafeteria/get-counter',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            counterId: Number(counterId)
        }
    })
}