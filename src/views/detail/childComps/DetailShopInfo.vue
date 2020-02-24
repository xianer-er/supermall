<template>
    <div class="shop-info"  v-if="Object.keys(shop).length !== 0 ">
        <div class="info-title">
            <img :src="shop.logo" alt="">
            <span class="title">{{shop.name}}</span>
        </div>
        <div class="shop-middle">
            <div class="shop-middle-item shop-middle-left">
                <div class="info-sells">
                    <div class="sells-count">
                        {{shop.sells | sellCountFilter}}
                    </div>
                    <div class="sells-text">总销量</div>
                </div>
                <div class="info-goods">
                    <div class="goods-count">
                        {{shop.goodsCount}}
                    </div>
                    <div class="goods-text">全部宝贝</div>
                </div>
            </div>
            <div class="shop-middle-item shop-middle-right">
                <table>
                    <tr v-for="(item,index) in shop.score" :key="index">
                        <td>{{item.name}}</td>
                        <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
                        <td class="better" :class="{'better-more':item.isBetter}">
                            <span>{{item.isBetter ? '高':'低'}}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shop-bottom">
            <div class="enter-shop">进店逛逛</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"DetailShopInfo",
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters: {
        sellCountFilter:function(value){
            if(value<10000) return value;
            return (value/10000).toFixed(1)+"万"
            // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
        }
    }

}
</script>

<style scoped>
.shop-info{
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.info-title img{
width: 50px;
height: 50px;
border-radius: 50px;
}
.info-title .title{
    font-size: 19px;
    position: relative;
    bottom: 20px;
    left: 20px;
}
.shop-middle{
    margin-top: 15px;
    display: flex;
    align-items: center;
}
.shop-middle-item{
    flex: 1;
}
.shop-middle-left{
    display: flex;
   justify-content: space-evenly;
   color: #333;
   text-align: center;
   border-right: 1px solid rgba(0, 0, 0, .1);

}

.sells-count .goods-count{
    font-size: 18px;
}
.sells-text .goods-text{
    margin-top: 10px;
    font-size: 12px;
}
.shop-middle-right{
    font-size: 13px;
    color: #333;
}
.shop-middle-right table{
    width: 120px;
    margin-left: 30px;
}
.shop-middle-right table td{
    padding: 5px 0;
}
.shop-middle-right .score{
    color: #5ea732;
}
.shop-middle-right .score-better{
    color: #f13e3a;
}
.shop-middle-right .better span{
    background-color: #5ea732;
    color: #fff;
    text-align: center;
}
.shop-middle-right .better-more span{
    background-color: #f13e3a;
}
.shop-bottom{
    margin-top: 15px;
   /* font-size: 18px; */
text-align: center;
color:#333;

}
.shop-bottom .enter-shop{
    margin:  0 auto;
    line-height: 28px;
    width: 200px;
    height: 28px;
    background-color: rgb(236, 241, 243);
    border-radius: 10px;
}
</style>