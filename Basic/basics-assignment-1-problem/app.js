const app = Vue.createApp({
    data() {
        return {
            name: 'WANG Biyun',
            age: 25,
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv2TN7qPVuAjV4I6UOSFauaw1ZlyVxUFelU96xZWoGQaExeFjSgias_9H7qg&usqp=CAc',
            enteredValue: ''
        }
    },
    methods: {
        randomNumber() {
            return Math.random();
        },
    }
});

app.mount('#assignment');