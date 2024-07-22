<template>
    <div class="item">
        <div v-if="name=='dish'">
            <router-link :to="`/dish/${preview.id}`">
                <DishPreview :dish="preview" />
            </router-link>
        </div>
        <div v-else-if="name=='counter'">
            <router-link :to="`/cafeteria/${cafeteria}/counter/${preview.id}`">
                <CounterPreview :counter="preview" />
            </router-link>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import DishPreview from './preview/DishPreview.vue';
import CounterPreview from './preview/CounterPreview.vue';
import router from '@/router';

export default defineComponent({
    name: 'Preview',
    props: {
        name: {
            type: String,
            required: true
        },
        preview: {
            type: Object,
            required: true
        },
        cafeteria: {
            type: String,
            required: false
        }
    },
    setup(props) {
        return {};
    }
});
</script>


<style scoped>

</style>