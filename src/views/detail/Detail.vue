<template>
  <div id="detail">
    <detail-nav-bar @tenTopClick="topBtnClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="goodsList" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="btnClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import BackTop from "@/components/content/backtop/BackTop";
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import {debounce} from '@/common/utils'

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      tenMeTops: [0],
      getThemeTopY: null,
      isShow: false
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.data.result
      // console.log(data);
      //1.获取顶部轮播图片
      this.topImages = data.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //4.获取商品详情数据
      this.detailInfo = data.detailInfo
      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.data.list
    })
    //4.给getThemeTopY赋值/防抖
    this.getThemeTopY = debounce(() => {
      //获取每个组件的高度
      this.tenMeTops = [0]
      this.tenMeTops.push(this.$refs.param.$el.offsetTop)
      this.tenMeTops.push(this.$refs.comment.$el.offsetTop)
      this.tenMeTops.push(this.$refs.goodsList.$el.offsetTop)
    }, 500)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    topBtnClick(index) {
      this.$refs.scroll.scrollTo(0, -this.tenMeTops[index], 300)
    },
    //监听滚动位置
    contentScroll(position) {
      this.isShow = (-position.y) > 1000
      const positionY = -position.y
      if (positionY >= this.tenMeTops[0] && positionY < this.tenMeTops[1]) {
        this.$refs.nav.currentIndex = 0
      } else if (positionY >= this.tenMeTops[1] && positionY < this.tenMeTops[2]) {
        this.$refs.nav.currentIndex = 1
      } else if (positionY >= this.tenMeTops[2] && positionY < this.tenMeTops[3]) {
        this.$refs.nav.currentIndex = 2
      } else if (positionY >= this.tenMeTops[3]) {
        this.$refs.nav.currentIndex = 3
      }
    },
    btnClick() {
      //拿到scroll对象调用里面的方法
      this.$refs.scroll.scrollTo(0, 0)
    },
    addToCart() {
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid =   this.iid
      this.$store.commit('addCart',product)
    }
  },
  mounted() {
    //监听item中图片加载完成,重新计算scroll的可滚动的高度
    this.$bus.$on('detailItemImgLoad', () => {
      this.$refs.scroll && this.$refs.scroll.refresh()
    })
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  height: 100vh;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>