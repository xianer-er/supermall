
import { debounce } from "./utils";
import BackTop from "../components/context/backTop/BackTop.vue";


export const itemListenerMixin = {
    data () {
        return {
            itemImgListener:null,
            newRefresh:null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    
        this.itemImgListener = () => {
          this.newRefresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImgListener);
      },
}

export const backTopMixin = {
 components: {
  BackTop
 },
  data (){
    return{
      isBackShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenBackTop(position){
      // 1.决定backtop是否显示
          this.isBackShow = -position.y > 500;
       },
  }
}