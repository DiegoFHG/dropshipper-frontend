<template>
  <v-container>
    <h1>Resultados de la busqueda "{{ searchTerm }}"</h1>
    <div class="productGrid" v-if="results.length > 0">
      <template v-for="product in results">
        <ProductCard
          :title="product.name"
          :price="product.price"
          :key="product.id"
          :seller="product.seller" />
      </template>
    </div>
  </v-container>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';

export default {
  props: ['results', 'searchTerm'],
  components: {
    ProductCard,
  },
  beforeMount() {
    if (this.searchTerm === undefined) this.$router.push({ path: '/' });
  },
  data() {
    return {};
  },
};
</script>

<style>
.product-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 400px));
  grid-gap: 50px;
  grid-area: max-content;
  justify-content: space-evenly;
}
</style>
