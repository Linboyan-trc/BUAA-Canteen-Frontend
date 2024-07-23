import http from "@/utils/http";

// 获取所有食堂的信息
export const getAllCafeterias = () => {
    // return http({
    //     url: '/cafeteria/get-all-cafeterias',
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    return {
        "data": [
            {
                "id":1,
                "name": "学院路新北",
                "img": 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333',
                "collectCount": 10,	
            },
            {
                "id":2,
                "name": "学院路合一",
                "img": 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333',
                "collectCount": 20,
            }
        ]
    }
}

//获取某食堂的信息
export const getCafeteria = ({cafeteriaId}) => {
    // return http({
    //     url: '/cafeteria/get-cafeteria',
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: {
    //         cafeteriaId
    //     }
    // })
    return {
        "data": {
            "id":2,
            "name": "学院路新北",
            "img": 'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333',
            "collectCount": 10,	
        }
    }
}

// 获取某食堂的全部柜台
export const getCountersOf = ({cafeteriaId}) => {
    // return http({
    //     url: '/cafeteria/get-counters-of',
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: {
    //         cafeteria
    //     }
    // })
    // temp
    return {
        "data": [
            {
                "id":1,
                "name":"基本伙",
                "img":'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333',
                "floor":1,
                "collectCount":10,
            },
            {
                "id":2,
                "name":"猪肚鸡",
                "img":'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333',
                "floor":-1,
                "collectCount":10,
            },
        ]
    }
}

// 获取某柜台的信息
export const getCounter = ({counterId}) => {
    // return http({
    //     url: '/cafeteria/counter/get-counter',
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: {
    //         counterId
    //     }
    // })
    return {
        'data' : 
        {
            "id":1,
            "name":"基本伙",
            "img":'https://img0.baidu.com/it/u=1413542175,232563950&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333',
            "floor":1,
            "collectCount":10,
        }
    }
}
//获取某柜台的全部菜肴
export const getDishes = ({counterId}) => {
    // return http({
    //     url: '/cafeteria/counter/get-dishes',
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: {
    //         cafeteria,
    //         counterId
    //     }
    // })
    //temp
    return {
        "data": [
            {
                "id":1,
                "name":"鱼香肉丝",
                "img":'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
                "collectCount":10,
                "ateCount":20,
                "user": {
                    "id": 1,
                    "avatar": "https://ww1.sinaimg.cn/mw690/0073ozWdly1hr3qefka09j30u00u0ke0.jpg",
                    "username": "测试用户1"
                }
            },
            {
                "id":2,
                "name":"糖醋里脊",
                "img":'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
                "collectCount":10,
                "ateCount":15,
                "user": {
                    "id": 2,
                    "avatar": "https://ww1.sinaimg.cn/mw690/0073ozWdly1hr3qefka09j30u00u0ke0.jpg",
                    "username": "测试用户2"
                }
            },
        ]
    }
}

// 这个不用了
//获取所有窗口和菜肴
export const getAllDishes = () => {
    // return http({
    //     url: '/cafeteria/get-all-dishes',
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: {
            
    //     }
    // })
    //temp
    return {
        "data": [
            {
                "id":1,
                "name":"鱼香肉丝",
                "img":'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
                "collectCount":10,
                "ateCount":20,
                "user": {
                    "id": 1,
                    "avatar": "https://ww1.sinaimg.cn/mw690/0073ozWdly1hr3qefka09j30u00u0ke0.jpg",
                    "username": "测试用户1"
                }
            },
            {
                "id":2,
                "name":"糖醋里脊",
                "img":'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500',
                "collectCount":10,
                "ateCount":15,
                "user": {
                    "id": 2,
                    "avatar": "https://ww1.sinaimg.cn/mw690/0073ozWdly1hr3qefka09j30u00u0ke0.jpg",
                    "username": "测试用户2"
                }
            },
        ]
    }
}