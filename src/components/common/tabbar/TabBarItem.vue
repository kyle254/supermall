<template>
   <div class="tab-bar-item" @click="itemClick">
     <!--  插槽一般需要再包裹一层div，设置属性的时候，在div里面设置 -->
     <div v-if="!isActive"><slot name="item-icon"></slot></div>
     <div v-else><slot name="item-icon-active"></slot></div>
     <div :style="activeStyle"><slot name="item-text"></slot></div>   
   </div>
</template>

<script>
export default {
    name:"TabBaritem",
    props:{
      path: String,
      activeColor:{
        type: String,
        default:'red'
      }
    },
    data(){
      return{
        // isActive:true
      }
    },
    computed:{
       isActive(){
         // indexOf匹配字符串。这里将当前活跃的path与传进来的path做比较，如果能匹配得到，就返回true，否则返回-1
         return this.$route.path.indexOf(this.path) != -1
       },
       activeStyle(){
         return this.isActive ? {color:this.activeColor} : {}
       }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    }
}
</script>

<style>
 .tab-bar-item
 {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
 }
 
 .tab-bar-item img{
   width: 24px;
   height: 24px;
   margin-top: 3px;
   vertical-align: middle;
   margin-bottom: 2px;
 }

</style>