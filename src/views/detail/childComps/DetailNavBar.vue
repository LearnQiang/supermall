<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img  src="~assets/img/common/jt.png" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles" :key="index"
             class="titles-item" :class="{active: currentIndex === index}"
             @click="titleClick(index)">{{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('tenTopClick', index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.titles {
  display: flex;
  font-size: 13px;
}

.titles-item {
  flex: 1;
}

.active {
  color: var(--color-tint);
}

.back img {
  margin-top: 12px;
  height: 20px;
  width: 20px;
}
</style>