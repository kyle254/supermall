<template>
   <div class="goods">
     <goods-list-item v-for="item in goods" :goods-item="item" :key="item.index"></goods-list-item>
   </div>
</template>

<script>
 import GoodsListItem from './GoodListItem'
export default {
    props:{
      goods:{
        type:Array,
        default() {
          return []
        }
      }
    },
    components:{
       GoodsListItem
    }
}
</script>

<style>
   .goods{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
   }
</style>