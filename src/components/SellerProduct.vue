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
      <v-btn text @click.stop="productEditDialog = true">Editar</v-btn>
    </v-card-actions>
    <v-dialog v-model="productEditDialog" persistent max-width="700px">
      <v-card>
        <v-card-title>Editar producto</v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field outlined label="Nombre" v-model="productName" />
            <v-row>
              <v-col>
                <v-text-field outlined label="Cantidad" v-model="productAmount" />
              </v-col>
              <v-col>
                <v-text-field outlined label="Precio" v-model="productPrice" />
              </v-col>
              <v-col>
                <v-text-field outlined label="Cantidad minima por compra"
                  v-model="productMinPurchaseAmount" />
              </v-col>
            </v-row>
            <v-textarea outlined clearable label="Descripción" v-model="productDescription" />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="productEditDialog = false">Cancelar</v-btn>
          <v-spacer />
          <v-btn
            text
            color="blue"
            :disabled="productEditSpinner"
            @click="updateProduct"
          >
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="productDeleteDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>¿Esta seguro que quiere borrar este producto?</v-card-title>
        <v-card-text>
          Al aceptar, el producto "{{ title }}" sera eliminado permanentemente. Esta operacion es irreversible.
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
    amount: {
      type: Number,
      required: true,
    },
    minPurchase: {
      type: Number,
      required: true,
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
      productEditSpinner: false,
      productDeleteDialog: false,
      productEditDialog: false,
      productName: this.title,
      productDescription: this.description,
      productPrice: this.price,
      productAmount: this.amount,
      productMinPurchaseAmount: this.minPurchase,
    };
  },
  methods: {
    ...mapActions('seller', [
      'removeProduct', 'editProduct',
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
    async updateProduct() {
      this.productEditSpinner = true;
      this.productEditDialog = false;

      const { data } = await this.$axios.patch(`api/products/${this.id}`, {
        name: this.productName === this.name ? undefined : this.productName,
        price: this.productPrice === this.price ? undefined : this.productPrice,
        description: this.productDescription === this.description ? undefined : this.productDescription,
        amount: this.productAmount === this.amount ? undefined : this.productAmount,
        min_amount_purchase: this.productMinPurchaseAmount === this.minPurchase ? undefined : this.productMinPurchaseAmount,
      });

      this.editProduct(data);
      this.productEditSpinner = false;
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
