const app = Vue.createApp({
    data() {
        return {
            tasks: [],
            enteredTaskValue: '',
            visible: true,
            btnContext: 'Hide List'
        }
    },
    watch: {
        visible(value) {
            if(value) {
                this.btnContext = 'Hide List';
            } else {
                this.btnContext = 'Show List';
            }
        }
    },
    methods: {
        addTask() {
            this.tasks.push(this.enteredTaskValue);
            this.enteredTaskValue = '';
        },
        changeVisibility(){
            this.visible = !this.visible;
        }
    },
});
app.mount('#assignment');