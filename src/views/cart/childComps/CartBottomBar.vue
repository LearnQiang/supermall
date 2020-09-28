<template>
  <div class="cart-bottom-bar">
    <div @click="checkClick">
      <img v-if="isSelectAll" src="~assets/img/cart/xzred.png" alt="">
      <img v-else src="~assets/img/cart/xz.png" alt="">
    </div>
    <span class="total-price">合计: ¥{{ totalPrice }}</span>
    <span class="buy-product" @click="cartClick">去结算({{ checkLength }})</span>
  </div>
</template>

<script>
export default {
  name: "CartBottomBar",
  computed: {
    totalPrice() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    checkLength() {
      let checkNum = null
      for (let item of this.$store.state.cartList) {
        if (item.checked) {
          checkNum += item.count
        }
      }
      return checkNum
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false
      //查找数组中是否有未选中的按钮,如果有就返回false
      return !(this.$store.state.cartList.find(item => !item.checked))
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    cartClick() {
      //查找目标元素，找到就返回元素的位置，找不到就返回-1
      if (this.$store.state.cartList.findIndex(item => item.checked === true) === -1) {
        this.$toast.show('请选择购买的商品')
      } else {
        this.$toast.show('正在结算请稍后...')
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  /*box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);*/
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 30px;
  box-sizing: border-box;
}

.cart-bottom-bar img {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
  width: 20px;
  height: 20px;
}

.total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>