<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <span slot="center">购物车({{ cartLength }})</span>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list :cart-list="cartList"/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import Scroll from "@/components/common/scroll/Scroll";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    cartLength() {
      let sum = null
      for (let item of this.$store.state.cartList) {
        sum += item.count
      }
      return sum
    },
    cartList() {
      return this.$store.state.cartList
    }
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}

#cart {
  height: 100vh;
  position: relative;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 93px;
  left: 0;
  right: 0;
}
</style>
