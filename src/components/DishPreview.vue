<template>
    <div class="dish-item">
        <div class="dish-img">
            <img :src="img" alt="窗口图片" />
        </div>
        <div class="dish-info">
            <p>{{ name }}</p>
            <div class="dish-collectCount">
                <span>{{ collectCount }} 收藏</span>
            </div>
            <div class="dish-ateCount">
                <span>{{ ateCount }} 吃过</span>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CounterPreview',
    props: {
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        collectCount: {
            type: Number,
            required: true
        },
        ateCount: {
            type: Number,
            required: true
        },
    },
    setup(props) {
        return {};
    }
});
</script>


<style scoped>
.dish-item {
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dish-img img {
    width: 100%;
    height: 100px;
    object-fit: cover;
}

.dish-info {
    padding: 10px;
    background-color: #f9f9f9;
}

.dish-info p {
    margin: 0;
    font-size: 14px;
    color: #333;
}

.dish-collectCount, .dish-ateCount {
    text-align: right;
    font-size: 12px;
    color: #666;
}
</style>