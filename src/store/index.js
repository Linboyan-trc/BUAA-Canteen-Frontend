import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null,
        dishes: [],
        favorites: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setDishes(state, dishes) {
            state.dishes = dishes;
        },
        setFavorites(state, favorites) {
            state.favorites = favorites;
        },
    },
    actions: {
        // 从后端 API 获取菜肴数据并提交到 mutations
        // axios.get('/api/dishes').then(response => commit('setDishes', response.data));
    },
    modules: {},
});