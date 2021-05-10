<template>
  <v-app>
    <v-app-bar app fixed color="white" elevate-on-scroll>
      <router-link class="router-link d-flex" to="/">
        <v-icon>mdi-package</v-icon>
        <span class="title font-weight-regular ml-3">Dropshipper</span>
      </router-link>
      <div class="app-bar-search-bar-container hidden-sm-and-down" v-show="$route.name === 'Home'">
        <v-text-field
          hide-details
          outlined
          dense
          flat
          clearable
          single-line
          label="Buscar"
          prepend-inner-icon="mdi-magnify"
          v-on:keyup.enter="search"
          v-model="searchTerm"
        />
      </div>
      <v-spacer />
      <v-btn text color="primary" @click="$router.push('/register')" v-show="user === undefined">
        Registrarse
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="$router.push('/login')"
        v-show="$route.name !== 'LogIn' && user === undefined"
      >
        Iniciar sesion
      </v-btn>
      <v-btn icon color="primary" @click="logout" v-show="$route.name !== 'LogIn' &&
        user !== undefined">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push('/profile')" v-show="user !== undefined"
        :disabled="$route.name === 'Profile' || $route.name === 'SellerProfile'">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    if (localStorage.getItem('user')) {
      try {
        this.setUser(JSON.parse(localStorage.getItem('user')));
      } catch {
        localStorage.removeItem('user');
      }
    }
  },
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    ...mapActions(['setUser', 'removeUser']),
    async search() {

    },
    async logout() {
      await this.$axios.delete('api/logout');

      this.removeUser();

      if (this.$route.path !== '/') this.$router.replace('/');
    },
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
};
</script>
<style scoped>
.app-bar-search-bar-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin-left: 10vw;
  margin-right: 10vw;
}

.router-link {
  text-decoration: none;
  color: black;
}
</style>
