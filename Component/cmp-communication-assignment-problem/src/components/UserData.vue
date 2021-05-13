<template>
    <section>
        <form @submit.prevent="submitData">
            <input type="text" v-model="enteredName" placeholder="Your name"/>
            <input type="text" v-model="enteredAge"  placeholder="Your age"/>
        <button>Set User Data</button>
        </form>
    </section>
</template>
<script>
export default {
    // emits: ['add-user'],
    emits: {
        'set-data': function(name, age) {
            if(name && age) {
                return true;
            } 
            if(name === '') {
                console.warn('name is missing!');
                return false;
            }
            if(age === '') {
                console.warn('age is missing!');
                return false;
            }
        }
    },
    data() {
        return {
            enteredName: '',
            enteredAge: ''
        }
    },
    methods: {
        submitData() {
            this.$emit('set-data', this.enteredName, this.enteredAge);
            this.enteredName = '';
            this.enteredAge = '';
        }
    },
}
</script>