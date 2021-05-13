<template>
    <button @click="login" v-if="!isAuth">LogIn</button>
    <button @click="logout" v-else>LogOut</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    methods: {
        ...mapActions(['login', 'logout'])
    },
    computed: {
        ...mapGetters({
            isAuth: 'userIsAuthenticated'
        })
    }
}
</script>