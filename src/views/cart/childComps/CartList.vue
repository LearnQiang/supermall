<template>
  <div class="cart-list">
    <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "@/views/cart/childComps/CartListItem";

export default {
  name: "CartList",
  components: {
    CartListItem
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>