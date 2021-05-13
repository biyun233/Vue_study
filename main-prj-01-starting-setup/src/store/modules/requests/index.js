const RequestModule = {
    namespaced: true,
    state() {
        return {
            requests: []
        };
    },
    mutations: {
        addRequest(state, payload) {
            state.requests.push(payload);
        },
        setRequests(state, payload) {
            state.requests = payload;
        }
    },
    actions: {
        async contactCoach(context, payload) {
            const newRequest = {
                userEmail: payload.email,
                message: payload.message
            };
            const response = await fetch(`https://vue-main-3be4f-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
                method: 'POST',
                body: JSON.stringify(newRequest)
            });
            const responseData = await response.json();
            if(!response.ok) {
                const err = new Error(responseData.message || 'Failed to contact!');
                throw err;
            }
            newRequest.id = responseData.name;
            newRequest.coachId = payload.coachId;
            context.commit('addRequest', newRequest);
        },
        async loadRequests(context) {
            const coachId = context.rootGetters.userId;
            const token = context.rootGetters.token;
            const response = await fetch(`https://vue-main-3be4f-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` + token);
            const responseData = await response.json();
            if(!response.ok) {
                const err = new Error(responseData.message || 'Failed to fetch!');
                throw err;
            }
            const requests = [];
            for(const key in responseData) {
                const request = {
                    id:key,
                    coachId: coachId,
                    userEmail: responseData[key].userEmail,
                    message: responseData[key].message
                };
                requests.push(request);
            }
            context.commit('setRequests', requests);
        }
    },
    getters: {
        requests(state, _, _2, rootGetters) {
            const coachId = rootGetters.userId;
            return state.requests.filter(request => request.coachId === coachId);
        },
        hasRequests(_, getters) {
            return getters.requests && getters.requests.length > 0;
        }
    }
};

export default RequestModule;