<template>
        <swiper class="swp">
          <swiper-item v-for="item in topImages" :key="item">
              <img :src="item" alt="">
          </swiper-item>
        </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper'
export default {
   components:{
      Swiper,
      SwiperItem
   },

   props: {
     topImages:{
       type:Array,
       default(){
         return []
       }
     }
   }
}
</script>

<style scoped>
   .swp{
     height: 300px;
     overflow: hidden;
   }
</style>