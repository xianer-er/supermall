<template>
  <div v-if="Object.keys(goods).length !== 0 " class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="now-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-others">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index].icon" />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
}
.info-title{
    color: #222;
}
.info-price{
    margin-top: 10px;
}
.info-price .now-price{
    font-size: 24px;
    color: var(--color-high-text)
}
.info-price .old-price{
    font-size: 13px;
    margin-left: 5px;
    text-decoration-line:line-through
}
.info-price .discount{
    color: #fff;
    font-size: 12px;
    padding: 2px 5px;
    background-color: var(--color-high-text);
    margin-left: 5px;
    border-radius: 8px; 

    position: relative;
    top:-8px;
}
.info-others{
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    justify-content:space-between;
}
.info-services{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
}
.info-services-item span{
    color: #333;
    font-size: 13px;
}

.info-services-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top:2px;
    
}
</style>