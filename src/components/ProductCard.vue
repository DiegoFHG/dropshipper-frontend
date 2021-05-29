<template>
  <v-card max-width="400px">
    <v-img width="400px" height="300px" src="@/assets/images/no-image-product.webp">
      <div style="display: flex; height: 100%;">
        <v-row align="center">
          <v-col align="center">
            <span class="white--text">Producto sin imagen</span>
          </v-col>
        </v-row>
      </div>
    </v-img>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      {{ description }}
    </v-card-text>
    <v-card-title class="blue--text">{{ priceToLocaleCurrency }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
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
    image: {
      type: String,
    },
    seller: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    priceToLocaleCurrency() {
      return this.price.toLocaleString(undefined, { style: 'currency', currency: 'EUR' });
    },
  },
};
</script>

<style>

</style>
