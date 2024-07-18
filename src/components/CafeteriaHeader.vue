<template>
    <div>
        <h3>所有食堂</h3>
        <ul>
            <li v-for="cafeteria in cafeterias">
                <router-link :to="`/cafeteria/${cafeteria.name_en}`"
                    :class="{ 'active': selectedCafeteria === cafeteria.name_en }">
                    {{ cafeteria.name_zh }}食堂
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'CafeteriaHeader',
    props: {
        selectedCafeteria: String
    },
    setup() {
        const cafeterias = ref([
            { name_en: 'student1', name_zh: '学一' },
            { name_en: 'student2', name_zh: '学二' },
            { name_en: 'student3', name_zh: '学三' },
            { name_en: 'student4', name_zh: '学四' },
            { name_en: 'student5', name_zh: '学五' },
            { name_en: 'student6', name_zh: '学六' },
            { name_en: 'teacher', name_zh: '教工' },
            { name_en: 'halal', name_zh: '清真' },
            { name_en: 'heyi', name_zh: '合一厅' },
        ])

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