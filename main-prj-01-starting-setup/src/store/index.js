import { createStore } from 'vuex';
import CoachModule from './modules/coaches/index.js';
import RequestModule from './modules/requests/index.js';
import AuthModule from './modules/auth/index.js';
const store = createStore({
    modules: {
        coach: CoachModule,
        request: RequestModule,
        auth: AuthModule
    },
});

export default store;