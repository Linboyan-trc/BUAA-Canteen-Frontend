<template>
    <div>
        <h1>欢迎来到北航食堂</h1>
        
        <nav v-for="cafeteria in cafeterias">
            <router-link :to="`/cafeteria/${cafeteria.name_en}`">
                {{ cafeteria.name_zh }}食堂 
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'All',
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
                    { name_en: 'heyi', name_zh: '合一厅' },
                ]
            };
        }
    }
</script>

<style scoped>

nav {
  font-size: 1.2rem;
  gap: 5px;
}

@media (hover: hover) {
    li:hover {
        background-color: bisque;
    }
}
</style>