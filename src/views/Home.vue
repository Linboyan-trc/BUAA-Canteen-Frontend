<template>
    <div class="sidebar">
        <h1>欢迎来到北航食堂</h1>
        
        <ul>
            <li v-for="cafeteria in cafeterias">
                <router-link :to="`/cafeteria/${cafeteria.name_en}`">
                    {{ cafeteria.name_zh }}食堂 
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                cafeterias: [
                    { name_en: 'student1', name_zh: '学一' },
                    { name_en: 'student2', name_zh: '学二' },
                    { name_en: 'student3', name_zh: '学三' },
                    { name_en: 'student4', name_zh: '学四' },
                    { name_en: 'student5', name_zh: '学五' },
                    { name_en: 'student6', name_zh: '学六' },
                    { name_en: 'teacher', name_zh: '教工' },
                    { name_en: 'halal', name_zh: '清真' },
                    { name_en: 'heyi', name_zh: '合一' },
                ]
            };
        }
    }
</script>

<style scoped>
.sidebar {
    position: fixed;
    left: 0;
    width: 200px;
    height: 100%;
    overflow: auto;
    background-color: #f0f0f0;
    padding: 20px;
}

ul {
    list-style-type: none;
    padding: 5px;
}

li {
    left: 0;
    width: 100%;
    font-size: x-large;
}

@media (hover: hover) {
    li:hover {
        background-color: bisque;
    }
}
</style>