<template>
    <div>
        <h3>所有食堂</h3>
        <ul>
            <li v-for="cafeteria in cafeterias">
                <router-link :to="`/cafeteria/${cafeteria.id}`"
                    :class="{ 'active': selectedCafeteria === cafeteria.id }">
                    {{ cafeteria.name }}食堂
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { getAllCafeterias } from '@/api';
import { onMounted, ref } from 'vue'

export default {
    name: 'CafeteriaHeader',
    props: {
        selectedCafeteria: Number
    },
    setup() {
        const cafeterias = ref([]);
        onMounted(async () => {
            const res = await getAllCafeterias();
            cafeterias.value = res.data;
            console.log(cafeterias.value)
        })

        return {
            cafeterias
        }
    }
}
</script>


<style scoped>
h3 {
    margin: 0;
    padding: 10px;
    background-color: #4274b9;
    color: white;
    text-align: center;
}

ul {
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
}

li {
    display: inline-block;
    margin-right: 0px;
}

a {
    display: block;
    /* width: 100px; */
}

.active {
    background-color: #4274b9;
}

@media (hover: hover) {
    a:hover {
        background-color: rgb(251, 216, 174);
    }
}
</style>