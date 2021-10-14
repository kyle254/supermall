<template> 
  <div>
    <nav-bar>
       <div slot="left" class="back" @click="backClick">
         <img src="../../../assets/img/common/back.svg" alt="">
       </div>
       <div slot="center" class="title">
          <div v-for="(item,index) in titles" :key="item.index" 
          class="title-item"
          :class="{active: index === currentIndex}"
          @click="titleClick(index)"
          >{{item}}</div>
       </div>
    </nav-bar>
  </div>
  
</template>

<script>

  import NavBar from '../../../components/common/navbar/NavBar' 
  
  export default {
     components:{
      NavBar
   },
   data(){
     return {
       currentIndex:0,
       titles:['商品','参数','评论','推荐']
     }
   },
   methods:{
      titleClick(index) {
         this.currentIndex = index;
         this.$emit('titleClick', index);
      },

      backClick(){
         this.$router.back()
         // this.$router.go(-1)
      }
   }
  }
</script>

<style>
   .title{
     display: flex;
     font-size: 15px;
   }

   .title-item{
     flex:1;
   }

   .active {
      color:var(--color-high-text);
   }

   .back img {
       margin-left: 15px;
       margin-top: 10px;
   }
</style>