<template>
    <div>
        <header>
            <CafeteriaHeader></CafeteriaHeader>
        </header>
        <body>
            <div class="dishes-preview">
                <router-link v-for="dish in dishes" :key="dish.id" :to="`/dish/${dish.id}`">
                <DishPreview :dish="dish" />
                </router-link>
            </div>
        </body>
    </div>
</template>

<script>
import { ref } from 'vue'
import DishPreview from '@/components/DishPreview.vue';
import CafeteriaHeader from '@/components/CafeteriaHeader.vue'
import { getAllDishes } from '@/api';

export default {
    name: 'All',
    components: {
        CafeteriaHeader,
        DishPreview
    },
    setup() {
        const dishes = ref([])
        //temp
        dishes.value = [
            { id: 1, name: '这是所有菜肴的鸡排饭', img: 'https://img0.baidu.com/it/u=1280589996,1795755610&fm=253&fmt=auto&app=120&f=JPEG?w=747&h=500', collectCount: 10, ateCount: 5 },
            { id: 2, name: '三合一面', img: 'https://img2.baidu.com/it/u=2788776168,2036404322&fm=253&fmt=auto&app=138&f=jpeg?w=375&h=500', collectCount: 20, ateCount: 10 },
            { id: 3, name: '三合一面', img: 'https://img2.baidu.com/it/u=2788776168,2036404322&fm=253&fmt=auto&app=138&f=jpeg?w=375&h=500', collectCount: 30, ateCount: 15 },
            { id: 4, name: '三合一面', img: 'https://img2.baidu.com/it/u=2788776168,2036404322&fm=253&fmt=auto&app=138&f=jpeg?w=375&h=500', collectCount: 40, ateCount: 20 },
            { id: 5, name: '三合一面', img: 'https://img2.baidu.com/it/u=2788776168,2036404322&fm=253&fmt=auto&app=138&f=jpeg?w=375&h=500', collectCount: 50, ateCount: 25 },
            { id: 6, name: '三合一面', img: 'https://img2.baidu.com/it/u=2788776168,2036404322&fm=253&fmt=auto&app=138&f=jpeg?w=375&h=500', collectCount: 60, ateCount: 30 },
            { id: 7, name: '三合一面', img: 'https://img2.baidu.com/it/u=2788776168,2036404322&fm=253&fmt=auto&app=138&f=jpeg?w=375&h=500', collectCount: 70, ateCount: 35 },
            { id: 8, name: '三合一面', img: 'https://img2.baidu.com/it/u=2788776168,2036404322&fm=253&fmt=auto&app=138&f=jpeg?w=375&h=500', collectCount: 80, ateCount: 40 },
        ]
        
        // onMounted(() => {
        // // 从后端 API 获取指定食堂的窗口数据
        //     fetchAllDishes(cafeteria.value)
        // })
        // const fetchAllDishes = async() => {
        //     try {
        //         const response = await getAllDishes()
        //         dishes.value = response.data
        //     } catch (error) {
        //         console.error('获取所有菜肴数据失败:', error)
        //     }
        // }

        return {
            dishes
        }
    }
}
</script>

<style src="@/assets/css/preview.css">

</style>