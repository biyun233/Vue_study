const app = Vue.createApp({
    data() {
      return {
        output: '',
        confirmedOutput: ''
      };
    },
    methods: {
      showAlert() {
          alert('Alert!')
      },
      saveInput(event) {
          this.output = event.target.value;
      },
      confirmInput(event) {
        this.confirmedOutput = this.output;
    }
    }
  });
  
  app.mount('#assignment');
  