<template>
  <v-container>
    <v-row align="center" class="ma-0">
      <v-btn icon class="mr-5" @click="$router.push('/profile')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1>Perfil de vendedor</h1>
    </v-row>
    <v-row align="center" class="ma-0 mb-5 mt-5">
      <h2>Productos</h2>
      <v-spacer />
      <v-dialog v-model="createProductDialog" persistent max-width="700px">
        <v-card>
          <v-card-title>Agregar producto</v-card-title>
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
              <v-switch inset label="Activo" v-model="productActive" />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="createProductDialog = false">Cancelar</v-btn>
            <v-spacer />
            <v-btn
              text
              color="blue"
              :disabled="addingProductSpinner"
              @click="createProduct"
            >
              Agregar
            </v-btn>
          </v-card-actions>
        </v-card>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="blue" v-on="on" v-bind="attrs">Agregar producto</v-btn>
        </template>
      </v-dialog>
    </v-row>
    <SellerProducts />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import SellerProducts from '../components/SellerProducts.vue';

export default {
  components: {
    SellerProducts,
  },
  data() {
    return {
      productName: '',
      productAmount: 0,
      productMinPurchaseAmount: 0,
      productPrice: 0.0,
      productDescription: '',
      productActive: false,
      addingProductSpinner: false,
      createProductDialog: false,
    };
  },
  methods: {
    ...mapActions('seller', [
      'setProducts',
      'addProduct',
      'removeProduct',
    ]),
    resetProductFields() {
      this.productName = '';
      this.productAmount = 0;
      this.productMinPurchaseAmount = 0;
      this.productPrice = 0;
      this.productDescription = '';
      this.productActive = false;
    },
    async createProduct() {
      try {
        this.addingProductSpinner = true;

        const { data: product } = await this.$axios.post('api/products', {
          name: this.productName,
          price: this.productPrice,
          amount: this.productAmount,
          description: this.productDescription,
          available: this.productActive,
          min_amount_purchase: this.productMinPurchaseAmount,
        });

        this.addProduct(product);
        this.addingProductSpinner = false;
        this.createProductDialog = false;
      } catch (e) {
        const { response: { status } } = e;

        if (status === 409 || status === 422) this.createProductDialog = false;
      }
    },
  },
  computed: {
    ...mapGetters('seller', [
      'products',
    ]),
  },
};
</script>

<style>

</style>
