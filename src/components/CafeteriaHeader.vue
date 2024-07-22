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
            { name_en: 'xylnorth', name_zh: '学院路北区' },
            { name_en: 'xyleast', name_zh: '学院路东区' },
            { name_en: 'xylwest', name_zh: '学院路西区' },
            { name_en: 'shwest', name_zh: '沙河西区'},
            { name_en: 'sheast', name_zh: '沙河东区'},
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