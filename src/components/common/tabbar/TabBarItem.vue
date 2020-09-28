<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  //父传子
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    //判断当前活跃路由的路径是否与传过来的路径一致
    isActive() {
      return this.$route.path === this.path
    },
    //如果isActive为true时给该标签添加颜色
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 13px;
}

/*图片设置高度*/
.tab-bar-item img {
  width: 26px;
  height: 26px;
  margin-top: 4px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
