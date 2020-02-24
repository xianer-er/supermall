<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info ref="params" :param-info="paramInfo"></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendInfo"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isBackShow"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
   
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "../../components/context/goods/GoodsList";


import { debounce } from "../../common/utils";
import { itemListenerMixin, backTopMixin } from "../../common/mixin";

import { mapActions } from "vuex";
import {
  getDetailData,
  Goods,
  Shop,
  GoodsParam,
  getRecommendData
} from "../../network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据传入的iid请求相应数据
    getDetailData(this.iid).then(res => {
      // 1.获取顶部图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(data);

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //  3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // console.log(this.shop);

      // 4.获取商品详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //  6.获取用户评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3.获取推荐数据
    getRecommendData().then(res => {
      this.recommendInfo = res.data.list;
      // console.log(this.recommendInfo);
    });

    // 4。给getThemeTopYs赋值,给this.getThemeTopYs进行防抖操作
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.newRefresh();
      this.getThemeTopYs();
    },
    titleClick(index) {
      // console.log(themeTopYs);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 50, 200);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;

      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 1.决定backtop是否显示
      this.listenBackTop(position);
    },
    addToCart() {
      // 1.获取购物车需要展示的信息

      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      this.addCart(product).then(res => {
        this.$toast.show(res,1500)
      });
      // this.$store.dispatch("addCart", product).then(res => {});
    }
  }
};
</script>

<style scoped>
#detail {
  position: fixed;
  z-index: 9;
  background-color: white;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: white;
}
</style>