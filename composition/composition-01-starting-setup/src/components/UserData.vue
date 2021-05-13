<template>
  <h2>{{ userName }}</h2>
  <h3>{{ age }}</h3>
  <div>
    <input type="text" placeholder="Favorite color" v-model="f_color" />
    <button @click="saveData">Set favorite color</button>
  </div>
</template>

<script>
import {
  ref,
  computed,
  inject,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue';
export default {
  emits: ['save-data'],
  props: ['firstName', 'lastName'],
  setup(props, context) {
    const uName = computed(function() {
      return props.firstName + ' ' + props.lastName;
    });

    const age = inject('userAge');

    onBeforeMount(function() {
      console.log('onBeforeMount');
    });
    onMounted(function() {
      console.log('onMounted');
    });
    onBeforeUpdate(function() {
      console.log('onBeforeUpdate');
    });
    onUpdated(function() {
      console.log('onUpdated');
    });
    onBeforeUnmount(function() {
      console.log('onBeforeUnmount');
    });
    onUnmounted(function() {
      console.log('onUnmounted');
    });
    const f_color = ref('');
    function saveData() {
      context.emit('save-data', f_color);
    }

    return { userName: uName, f_color, saveData, age };
  }
};
</script>
