<template>
  <div>
    <div class="product-grid" v-if="!fetchedProducts">
      <template v-for="(n, index) in 8">
        <v-col :key="index">
          <div>
            <v-skeleton-loader
              type="card-heading, paragraph, card-heading, actions"
              max-width="400px"
            />
          </div>
        </v-col>
      </template>
    </div>
    <div class="product-grid" v-else>
      <template v-for="product in products">
        <SellerProduct
          :id="product.id"
          :title="product.name"
          :description="product.description"
          :price="product.price"
          :active="product.available"
          :key="product.id"
        />
      </template>
    </div>
    <div v-if="products.length === 0">
      <h1>No hay productos</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import SellerProduct from './SellerProduct.vue';

export default {
  components: {
    SellerProduct,
  },
  async mounted() {
    const { data } = await this.$axios.get('api/me/sellers/relationships/products');

    this.setProducts(data);
    this.fetchedProducts = true;
  },
  data() {
    return {
      fetchedProducts: false,
    };
  },
  methods: {
    ...mapActions('seller', ['setProducts']),
  },
  computed: {
    ...mapGetters('seller', ['products']),
  },
};
</script>

<style scoped>
.product-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 400px));
  grid-gap: 16px;
  grid-area: auto;
  justify-content: space-between;
}
</style>
