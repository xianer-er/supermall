<template>
    <div class="tabControl" >
       <div v-for="(item,index) in titles" class="tabControlItem"
       :class="{active: index===currentIndex}" @click="onclick(index)">
            <span>{{item}}</span>
       </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
   props:{
       titles:{
           type:Array,
           default(){
               return[]
           }
       }
   },
   data () {
       return {
           currentIndex:0,
       }
   },
   methods: {
       onclick(index){
        this.currentIndex=index;
        this.$emit('tabClick',index);
        
       }
   }
}
</script>

<style scoped>
.tabControl{
    display:flex;
    text-align: center;
    font-size: 15px;
      height: 40px;
    line-height: 40px;
    background-color: #fff;
}
.tabControlItem{
    flex:1;

}
.tabControlItem span {
     padding:5px;
}
.active{
    color: var(--color-high-text);
}
.active span {
    border-bottom: 2px solid var(--color-high-text);
}
</style>