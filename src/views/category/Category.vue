<template>
  <div id="category">
    <category-nav-bar class="category-nav"></category-nav-bar>
    <scroll class="content">
        <category-title :titles="titles"></category-title>
    </scroll>
  
  </div>
</template>

<script>
import Scroll from "../../components/common/scroll/Scroll";
import CategoryNavBar from "./childComps/CategoryNavBar";
import CategoryTitle from "./childComps/CategoryTitles";

import { getCategoryData } from "../../network/category";

export default {
  name: "Category",
  components: {
    Scroll,
    CategoryTitle,
    CategoryNavBar
  },
  data() {
    return {
      mes: {},
      titles: []
    };
  },
  created() {
    // 1.获得分类的数据
    getCategoryData().then(res => {
      const data = res.data.category;
      console.log(data);

      this.titles = data.list;
    });
  }
};
</script>

<style scoped>
#category{
  height: 100vh;
  /* position: relative;
  z-index: 10;
  background-color: #fff; */
}
.content{
  height: calc(100% - 44px - 49px);

}
.category-nav{
  position: relative;
  z-index: 9;
  background-color: white;
}
</style>