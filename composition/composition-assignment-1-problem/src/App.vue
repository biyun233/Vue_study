<template>
  <h2>My Course Goal</h2>
  <!-- Task 1: Output your main course goal with help of the composition API -->
  <!-- Don't hardcode it into the template, instead hardcode it into the JS code -->
  <h3 v-if="app.visibility === 'Hide'">{{ app.goal }}</h3>
  <!-- Task 2: Toggle (show/ hide) the goal with help of the button  -->
  <button @click="changeVisibility">{{ app.visibility }}</button>
  <!-- Task 3: Manage data in three ways -->
  <!-- => Separate refs -->
  <!-- => Ref Object -->
  <!-- => Reactive Object -->
  <!-- Task 4: Also solve the assignment with the Options API -->
</template>

<script>
// import { ref } from 'vue';
import { reactive } from 'vue';
export default {
  setup() {
    //  => Separate refs 

    // const goal = ref('finish the course');
    // const visibility = ref('Show');

    // function changeVisibility() {
    //   if(visibility.value == 'Show') {
    //     visibility.value = 'Hide';
    //   } else {
    //     visibility.value = 'Show';
    //   }
    // }
    // return { goal: goal, visibility: visibility, changeVisibility: changeVisibility };

    //  => Ref Object

    // const app = ref({
    //   goal: 'finish the course',
    //   visibility: 'Show'
    // });
    // function changeVisibility() {
    //   if(app.value.visibility == 'Show') {
    //     app.value.visibility = 'Hide';
    //   } else {
    //     app.value.visibility = 'Show';
    //   }
    // }
    // return { app: app, changeVisibility:changeVisibility };

    // => Reactive Object
    const app = reactive({
      goal: 'finish the course',
      visibility: 'Show'
    });
    function changeVisibility() {
      if(app.visibility == 'Show') {
        app.visibility = 'Hide';
      } else {
        app.visibility = 'Show';
      }
    }
    return { app: app, changeVisibility:changeVisibility };

  }
}
</script>

<style>
html {
  font-family: sans-serif;
}
body {
  margin: 3rem;
  text-align: center;
}
</style>