<template>
    <div class="counter-item">
        <div class="counter-image">
            <img :src="image" alt="窗口图片" />
        </div>
        <div class="counter-info">
            <p>{{ description }}</p>
            <div class="counter-likes">
                <span>{{ likes }} 收藏</span>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CounterPreview',
    props: {
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        // 在这里可以使用组合API的特性
        return {};
    }
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

.counter-info {
    padding: 10px;
    background-color: #f9f9f9;
}

.counter-info p {
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