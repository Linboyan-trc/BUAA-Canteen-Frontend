<template>
    <div>
        <header>
            <CafeteriaHeader></CafeteriaHeader>
        </header>
        <body>
            <div class="dishes-preview">
                <div v-for="dish in dishes" :key="dish.id">
                    <Preview :name="'dish'" :preview="dish" />
                </div>
            </div>
        </body>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Preview from '@/components/Preview.vue';
import CafeteriaHeader from '@/components/CafeteriaHeader.vue'
import { getAllDishes } from '@/api';

export default {
    name: 'All',
    components: {
        CafeteriaHeader,
        Preview
    },
    setup() {
        const dishes = ref([])
        
        onMounted(() => {
            fetchAllDishes()
        })
        const fetchAllDishes = async() => {
            try {
                const response = await getAllDishes()
                dishes.value = response.data
            } catch (error) {
                console.error('获取所有菜肴数据失败:', error)
            }
        }

        return {
            dishes
        }
    }
}
</script>

<style scoped>

</style>