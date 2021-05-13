<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      changeSaved: false
    }
  },
  inject: ['users'],
  methods: {
    confirmInput() {
      this.$router.push('/teams');
    },
    saveChanges(){
      this.changeSaved = true;
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log('Before Route Leave');
    console.log(to, from);
    if(this.changeSaved) {
      next();
    } else {
      const userWantToLeave = confirm('Are you sure? You got unsaved changes.');
      next(userWantToLeave);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>