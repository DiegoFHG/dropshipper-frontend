<template>
  <v-card max-width="400px">
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
  },
  data() {
    return {};
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
