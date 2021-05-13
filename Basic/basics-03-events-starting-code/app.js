const app = Vue.createApp({
  data() {
    return {
      counter: 10,
      name: '',
      confirmedName: ''
    };
  },
  watch: {
    counter(value) {
      if(value > 50) {
        this.counter = 0;
      }
    }
  },
  computed: {
    // fullname() {
    //   console.log('running again...');
    //   if(this.name === ''){
    //     return '';
    //   }
    //   return this.name + ' ' + 'WANG';
    // }
  },
  methods: {
    add(num) {
        this.counter = this.counter + num;
    },
    reduce(num) {
      if(this.counter - num >= 0)
      this.counter = this.counter - num;
    },
    setName(event, lastName) {
      this.name = event.target.value + ' ' + lastName;
    },
    submitForm() {
      alert('Submitted!');
    },
    confirmInput() {
      this.confirmedName = this.name;
    },
    resetInput() {
      this.name = '';
    }
  }
});

app.mount('#events');
