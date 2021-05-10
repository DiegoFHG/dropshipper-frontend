<template>
  <v-container>
    <h1>Ultimos productos</h1>
    <ProductGrid />
  </v-container>
</template>

<script>
import ProductGrid from '../components/ProductGrid.vue';

export default {
  name: 'Home',
  components: {
    ProductGrid,
  },
  data() {
    return {};
  },
};
</script>

<style>
.ma-16 .products__container {
  background-color: red !important;
  display: flex !important;
  flex-direction: row;
}

.product__card {
  margin-right: 5px;
}
</style>
