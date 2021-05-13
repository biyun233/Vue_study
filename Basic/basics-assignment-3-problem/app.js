// const app = Vue.createApp({
//   data() {
//     return {
//       number: 0,
//       result: "",
//     };
//   },
//   watch: {
//     number(value) {
//       if(value < 37) {
//         this.result = 'Not there yet';
//       } else if (value == 37) {
//         this.result = '37';
//       } 
//       else if(value > 37) {
//         this.result = 'Too much!';
//       }
//     },
//     result() {
//       const that = this;
//       setTimeout(() => {
//         that.number = 0;
//       }, 5000);
//     }
//   },
//   methods: {
//     add(num) {
//       this.number = this.number + num;
//     }
//   },
// });
// app.mount("#assignment");

const app = Vue.createApp({
  data() {
    return {
      number: 0,
    };
  },
  watch: {
    result() {
      const that = this;
      setTimeout(() => {
        that.number = 0;
      }, 5000);
    }
  },
  computed: {
    result() {
      if(this.number < 37) {
        return 'Not there yet';
      } else if (this.number == 37) {
        return this.number;
      } else if(this.number > 37) {
        return 'Too much!';
      }
    }
  },
  methods: {
    add(num) {
      this.number = this.number + num;
    }
  },
});
app.mount("#assignment");

