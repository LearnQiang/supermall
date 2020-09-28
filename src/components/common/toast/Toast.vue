<template>
  <div class="toast"  v-show="isShow">
    <div class="title">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration=1500) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position:fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 999;
  background: rgba(0,0,0,0.8);
  border-radius: 5px;
  padding: 16px 14px;
}
.title {
  color: #fff;
  font-size: 14px;
  text-align: center;
}
</style>