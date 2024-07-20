<template>
    <div class="counter-item">
        <div class="counter-image">
            <img :src="counter.img" alt="窗口图片" />
        </div>
        <div class="counter-floor">
            <p>{{ counter.name }}: {{ counter.floor }}层</p>
            <div class="counter-likes">
                <span>{{ counter.collectCount }} 收藏</span>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CounterPreview',
    props: {
        counter: {
            type: Object,
            required: true
            // name: {
            //     type: String,
            //     required: true
            // },
            // img: {
            //     type: String,
            //     required: true
            // },
            // floor: {
            //     type: Number,
            //     required: true
            // },
            // collectCount: {
            //     type: Number,
            //     required: true
            // }
        }
    },
});
</script>


<style scoped>
.counter-item {
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.counter-image img {
    width: 100%;
    height: 100px;
    object-fit: cover;
}

.counter-floor {
    padding: 10px;
    background-color: #f9f9f9;
}

.counter-floor p {
    margin: 0;
    font-size: 14px;
    color: #333;
}

.counter-likes {
    text-align: right;
    font-size: 12px;
    color: #666;
}
</style>