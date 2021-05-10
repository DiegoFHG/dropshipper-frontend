<template>
  <v-card max-width="400px">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      {{ description }}
    </v-card-text>
    <v-card-title class="blue--text">{{ priceToLocaleCurrency }}</v-card-title>
    <v-card-actions>
      <v-btn
        text
        @click="toggleActive"
        :disabled="productToggleSpinner"
      >
        {{ productActive ? 'Desactivar' : 'Activar' }}
      </v-btn>
      <v-btn text :disabled="productDeleteSpinner" @click.stop="productDeleteDialog = true">Eliminar</v-btn>
      <v-spacer />
      <v-btn text>Editar</v-btn>
    </v-card-actions>
    <v-dialog v-model="productDeleteDialog" persisten max-width="400px">
      <v-card>
        <v-card-title>¿Esta seguro que quiere borrar este producto?</v-card-title>
        <v-card-text>
          Al aceptar, el producto {{ title }} sera eliminado permanentemente. Esta operacion es irreversible.
        </v-card-text>
        <v-card-actions>
          <v-btn text color="red" @click="deleteProduct">Borrar</v-btn>
          <v-spacer />
          <v-btn text color="blue" @click="productDeleteDialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: 'Sin descripcion.',
    },
    price: {
      type: Number,
      default: 0.0,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      productActive: this.active,
      productDeleteSpinner: false,
      productToggleSpinner: false,
      productDeleteDialog: false,
    };
  },
  methods: {
    ...mapActions('seller', [
      'removeProduct',
    ]),
    async deleteProduct() {
      this.productDeleteDialog = false;
      this.productDeleteSpinner = true;

      try {
        await this.$axios.delete(`api/products/${this.id}`);

        this.removeProduct(this.id);
        this.productDeleteSpinner = false;
      } catch (e) {
        this.productDeleteSpinner = false;

        const { response: { status } } = e;

        if (status === 404) {
          // TODO: Show snackbar.
        }
      }
    },
    async toggleActive() {
      const { data: { available } } = await this.$axios.patch(`api/products/${this.id}`, {
        available: this.productActive ? false : true,
      });

      this.productActive = available;
    },
  },
  computed: {
    priceToLocaleCurrency() {
      return this.price.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
    },
  },
};
</script>

<style>

</style>
