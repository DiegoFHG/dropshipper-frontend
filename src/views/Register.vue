<template>
  <v-container fluid>
    <v-row align="center">
      <v-col align="center">
        <h1 class="display-2">Registrarse</h1>
        <div class="register-container">
          <v-text-field outlined label="Correo electronico" v-model="email" />
          <v-text-field outlined label="Contraseña" type="password" v-model="password" />
          <v-text-field outlined label="Nombre" v-model="firstName" />
          <v-text-field outlined label="Apellidos" v-model="lastName" />
          <v-btn text @click="register">Registrarse</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  },
  methods: {
    async register() {
      try {
        await this.$axios.post('api/register', {
          email: this.email,
          password: this.password,
          first_name: this.firstName,
          last_name: this.lastName,
        });

        this.$router.replace('/');
      } catch ({ response: { status } }) {
        if (status === 400) {
          this.email = '';
          this.password = '';
          this.firstName = '';
          this.lastName = '';
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

.register-container {
  padding-top: 2em;
  width: clamp(280px, 300px, 420px)
}
</style>
