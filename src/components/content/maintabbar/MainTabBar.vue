<template>
  <tab-bar class="mainTabBar">
    <tab-bar-item path="/home" activeColor="deeppink">
      <img slot="item-icon" src="../../../assets/img/tabbar/home.png" alt="">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/homered.png" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="deeppink">
      <img slot="item-icon" src="../../../assets/img/tabbar/fen.png" alt="">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/fenred.png" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="deeppink">
      <img slot="item-icon" src="../../../assets/img/tabbar/gouwuche.png" alt="">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/gouwuchered.png" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deeppink">
      <img slot="item-icon" src="../../../assets/img/tabbar/me.png" alt="">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/mered.png" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar";
import TabBarItem from "../../common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
.mainTabBar {
  z-index: 1;
}
</style>
