<template>
  <v-container>
    <h1>Perfil</h1>
    <div v-if="user">
      <h2>Nombre: {{ user.first_name }} {{ user.last_name }}</h2>
      <h2>Email: {{ user.email }}</h2>
      <br />
      <v-btn
        text
        v-if="user.seller !== undefined"
        @click="$router.push('/profile/seller')"
      >
        Ver perfil de vendedor
      </v-btn>
      <v-dialog v-model="sellerDialog" persistent max-width="500px" >
        <v-card>
          <v-card-title>
            <span class="headline">Crear cuenta de vendedor</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field outlined label="Nombre de vendedor" v-model="name" />
              <v-row>
                <v-col>
                  <v-text-field outlined label="DNI" v-model="dni" />
                </v-col>
                <v-col>
                  <v-text-field outlined label="Numero telefonico" v-model="phone" />
                </v-col>
              </v-row>
              <v-text-field outlined label="Dirección de vendedor" v-model="address" />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="sellerDialog = false">Cancelar</v-btn>
            <v-btn text @click="createSeller">Enviar</v-btn>
          </v-card-actions>
        </v-card>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-on="on"
            v-bind="attrs"
            v-if="user.seller === undefined"
          >
            Crear cuenta de vendedor
          </v-btn>
        </template>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      dni: '',
      address: '',
      phone: '',
      sellerDialog: false,
    };
  },
  methods: {
    ...mapActions(['setUser']),
    async createSeller() {
      try {
        await this.$axios.post('api/sellers', {
          name: this.name,
          dni: this.dni,
          address: this.address,
          phone_number: this.phone,
        });

        const { data } = await this.$axios.get('api/me');

        this.setUser(data);
        this.sellerDialog = false;
      } catch (e) {
        const { response: { status } } = e;

        if (status === 409) this.$router.push('/');
      }
    },
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
};
</script>

<style>

</style>
