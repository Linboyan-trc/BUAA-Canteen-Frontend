<template>
    <div>
        <header>
            <CafeteriaHeader></CafeteriaHeader>
        </header>
        <body>
            <div class="cafeterias-preview">
                <div v-for="cafeteria in cafeterias" :key="cafeteria.id">
                    <Preview :name="'cafeteria'" :preview="cafeteria" />
                </div>
            </div>
        </body>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Preview from '@/components/Preview.vue';
import CafeteriaHeader from '@/components/CafeteriaHeader.vue'
import { getAllCafeterias } from '@/api';

export default {
    name: 'All',
    components: {
        CafeteriaHeader,
        Preview
    },
    setup() {
        const cafeterias = ref([])
        
        onMounted(() => {
            fetchAll()
        })
        const fetchAll = async() => {
            try {
                const response = await getAllCafeterias()
                cafeterias.value = response.data
            } catch (error) {
                console.error('获取所有食堂数据失败:', error)
            }
        }

        return {
            cafeterias
        }
    }
}
</script>

<style scoped>

</style>