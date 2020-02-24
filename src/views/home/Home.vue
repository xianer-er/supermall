<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isBackShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./chirdcomps/HomeSwiper";
import RecommendView from "./chirdcomps/RecommendView";
import FeatureView from "./chirdcomps/FeatureView";

import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/context/tabControl/TabControl";
import GoodsList from "../../components/context/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "../../network/home";
import { debounce } from "../../common/utils";
import { itemListenerMixin, backTopMixin } from "../../common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",

      tabOffSetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存saveY
    this.saveY = this.$refs.scroll.getScrollY();

    // 2.取消全局监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  created() {
    //  1.请求轮播图和四个小标题数据
    this.getHomeMultidata_m();

    //  2.请求首页数据
    this.getHomeGoods_m("pop");
    this.getHomeGoods_m("new");
    this.getHomeGoods_m("sell");
  },
  mounted() {
    // 1.监听item中图片加载事件
    // const refresh = debounce(this.$refs.scroll.refresh);
    // this.$bus.$on("itemImageLoad", () => {
    //   refresh();
    // });
    // let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    // // 2.对监听的事件进行保存
    // this.itemImgListener = () => {
    //   newRefresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  methods: {
    // 事件点击的方法

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },

    contentScroll(position) {
      // 1.决定backtop是否显示
      this.listenBackTop(position);
      // 2.决定tabcontrol是否吸顶（position：fixed）
      this.isTabFixed = -position.y > this.tabOffSetTop;
    },
    loadMore() {
      this.getHomeGoods_m(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 请求网络数据的方法
    getHomeMultidata_m() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods_m(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;

  /*  原生js中滑动页面时导航栏不跟着动*/
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>