import Vue from 'vue';
import Vuex from 'vuex';
import {todo} from '@/store/modules/todo';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
         todo,
    },
    strict: debug,
});
