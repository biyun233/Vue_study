const app = Vue.createApp({
    data() {
        return {
            hide: false,
            classInput: '',
            colorInput: ''
        }
    },
    computed: {
        pColor() {
            return {backgroundColor: this.colorInput};
        }
    },
    methods: {
        toggle() {
            this.hide = !this.hide; 
        }
    },
});

app.mount('#assignment');