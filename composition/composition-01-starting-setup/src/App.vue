<template>
  <section class="container">
    <user-data
      :first-name="firstName"
      :last-name="lastName"
      @save-data="saveData"
    ></user-data>
    <button @click="setNewAge">Change Age</button>
    <div>
      <input type="text" placeholder="First Name" v-model="firstName" />
      <input type="text" placeholder="Last Name" v-model="lastName" />
      <button @click="setLastName">set LastName</button>
    </div>
    <h3>{{ color }}</h3>
  </section>
</template>

<script>
import { ref, computed, watch, provide } from 'vue';
import UserData from './components/UserData.vue';
export default {
  components: { UserData },
  setup() {
    const firstName = ref('');
    const lastName = ref('');

    const uAge = ref(31);
    provide('userAge', uAge);
    const uName = computed(function() {
      return firstName.value + ' ' + lastName.value;
    });

    watch([uAge, uName], function(newValues, oldValues) {
      console.log('old: ' + oldValues[0]);
      console.log('new: ' + newValues[0]);
      console.log('old: ' + oldValues[1]);
      console.log('new: ' + newValues[1]);
    });

    function setNewAge() {
      uAge.value = 32;
    }

    const color = ref('');
    function saveData(f_color) {
      color.value = f_color.value;
    }

    const lastNameInput = ref(null);

    function setLastName() {
      lastName.value = lastNameInput.value.value;
    }

    // function setFirstName(event) {
    //   firstName.value = event.target.value;
    // }

    // function setLastName(event) {
    //   lastName.value = event.target.value;
    // }
    return {
      userName: uName,
      age: uAge,
      setNewAge: setNewAge,
      firstName,
      lastName,
      lastNameInput,
      setLastName,
      saveData,
      color
    };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>
