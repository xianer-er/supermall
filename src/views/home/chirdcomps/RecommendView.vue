<template>
    <div class="recommend">
      <div v-for="item in recommends"  class="recommend-item">
          <a>
              <img v-lazy="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
    </div>
</template>

<script>
export default {
    name:"RecommendView",
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.recommend{
    /* 水平布局 */
    display:flex;     
    width: 100%;
  text-align: center;
  font-size: 12px;
padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item{
    /* 实现均等分 */
    flex: 1;
}
.recommend-item img{
    width: 70px;
    height: 70px;
    /* margin-top: 5px; */
   margin-bottom: 10px;
  /* margin-right: 15px; */
    
}

</style>