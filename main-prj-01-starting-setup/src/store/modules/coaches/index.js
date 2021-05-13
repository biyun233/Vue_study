

const CoachModule = {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            userIsCoach: false,
            coaches: [
                {
                  id: 'c1',
                  firstName: 'Maximilian',
                  lastName: 'Schwarzmüller',
                  areas: ['frontend', 'backend', 'career'],
                  description:
                    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                  hourlyRate: 30
                },
                {
                  id: 'c2',
                  firstName: 'Julie',
                  lastName: 'Jones',
                  areas: ['frontend', 'career'],
                  description:
                    'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                  hourlyRate: 30
                }
              ]
        };
    },
    mutations: {
        registerCoach(state, payload) {
            state.coaches.push(payload);
        },
        setCoaches(state, payload) {
            state.coaches = payload;
        },
        setFetchTimestamp(state) {
            state.lastFetch = new Date().getTime();
        }
    },
    actions: {
        async registerCoach(context, data) {
            const userId = context.rootGetters.userId;
            const coachData = {
                firstName: data.first,
                lastName: data.last,
                description: data.desc,
                hourlyRate: data.rate,
                areas: data.areas
            };
            const token = context.rootGetters.token;

            const response = await fetch(`https://vue-main-3be4f-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token, {
                method: 'PUT',
                body: JSON.stringify(coachData)
            });
            const responseData = await response.json();
            if(!response.ok) {
                const err = new Error(responseData.message || 'Failed to register!');
                throw err;
            }

            context.commit('registerCoach', {
                ...coachData,
                id: userId
            });
        },
        async loadCoaches(context, payload) {
            if(!payload.forceRefresh && !context.getters.shouldUpdate) {
                return;
            }
            
            const response = await fetch(`https://vue-main-3be4f-default-rtdb.firebaseio.com/coaches.json`);
            
            if(!response.ok) {
                const err = new Error(responseData.message || 'Failed to fetch!');
                throw err;
            }
            const responseData = await response.json();

            const coaches = [];
            for (const key in responseData) {
                const coach = {
                    id: key,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    description: responseData[key].description,
                    hourlyRate: responseData[key].hourlyRate,
                    areas: responseData[key].areas,
                };
                coaches.push(coach);
            }
            context.commit('setCoaches', coaches);
            context.commit('setFetchTimestamp');
        }

    },
    getters: {
        coaches(state) {
            return state.coaches;
        },
        hasCoaches(state) {
            return state.coaches && state.coaches.length > 0;
        },
        isCoach(_, getters,_2, rootGetters) {
            const coaches = getters.coaches;
            const userId = rootGetters.userId;
            return coaches.some(coach => coach.id === userId);
        },
        shouldUpdate(state) {
            const lastFetch = state.lastFetch;
            if(!lastFetch) {
                return true;
            }
            const currentTimeStamp = new Date() .getTime();
            return (currentTimeStamp -lastFetch) / 1000 > 60;
        }
    }
}
export default CoachModule;