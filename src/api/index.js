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

