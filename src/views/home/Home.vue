<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommend="recommends"></home-recommend>
    <feature-view/>
    <tab-control class="tab-control" :title="['流行','新款','新品']"></tab-control>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getHomeMultidata} from "@/network/home";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommend from "@/views/home/childComps/HomeRecommend";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/views/home/childComps/TabControl";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    })
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
}

/*移到到某个位置自动吸顶*/
.tab-control {
  position: sticky;
  top: 40px;
}
</style>
