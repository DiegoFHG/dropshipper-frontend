<template>
  <v-container fluid>
    <v-row align="center">
      <v-col align="center">
        <h1 class="display-2">Iniciar sesion</h1>
        <div class="login-container">
          <v-text-field outlined label="Correo electronico" v-model="email" />
          <v-text-field outlined label="Contraseña" type="password" v-model="password" />
          <v-btn text @click="login">Iniciar session</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['setUser']),
    fetchCsrfToken() {
      this.$axios.get('sanctum/csrf-cookie');
    },
    async login() {
      this.fetchCsrfToken();

      try {
        const { data } = await this.$axios.post('api/login', {
          email: this.email,
          password: this.password,
        });

        this.setUser(data);
        this.$router.replace('/');
      } catch (e) {
        const { response: { status } } = e;

        if (status === 401) {
          this.email = '';
          this.password = '';
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100;
}

.login-container {
  padding-top: 2em;
  width: clamp(280px, 300px, 420px)
}
</style>
