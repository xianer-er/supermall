<template>
  <div class="titles-info">
    <div class="titles-item" v-for="(item,index) in titles"
     :key="index" :class="{active:index === currentIndex}"
     @click="titleclick(index)">
    {{item.title}}
     </div>
  </div>
</template>

<script>
export default {
  name: "CategoryTitle",
  props:{
      titles:{
          type:Array,

      }
  },
  data () {
    return {
      isclick:false,
      currentIndex:0
    }
  },
  methods: {
    titleclick(index){
 this.currentIndex = index;
    }
  }

};
</script>

<style scoped>
.titles-info{
    width: 80px;
    color: #333;
    background-color: rgba(100, 100, 100, .1);

    font-size: 20px;
    /* border-bottom-color:5px solid rgba(100, 100, 100, .1) */
}
.titles-item{
margin-bottom: 20px ;
}
.active{
 background-color: #fff;
 border-left: 5px solid orangered;
}
</style>
