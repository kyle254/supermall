<template>
   <div class="bottom-bar">
     <div class="content">
        <check-button 
          class="check-all" 
          :is-checked="isSellectAll"
          @click.native="checkClick">
        </check-button>
        <span>全选</span>
     </div>

     <div class="price">
        合计：¥{{totalPrice}}
     </div> 

     <div class="calculate">
        去计算({{checkLength}})
     </div>
   </div>
</template>

<script>

import CheckButton from './CheckButton'

export default {
   components:{
     CheckButton
   },
   computed:{
     totalPrice() {
       return  this.$store.state.cartList.filter(item => {
           return item.checked 
       }).reduce((prevalue,item) => {
           return prevalue + item.price * item.count
       },0).toFixed(2)
     },

     checkLength() {
        return  this.$store.state.cartList.filter(item => {return item.checked}).length     
     },
     
     isSellectAll() {
       if(this.$store.state.cartList.length === 0) return false
       // 主要逻辑：判断一个不选中
       // 1.使用filter
       // return !(this.$store.state.cartList.filter(item => !item.checked).length)
       // 2.使用find()
       //return !(this.$store.state.cartList.find(item => !item.checked)) 
       // 3.使用some()   
      return !(this.$store.state.cartList.some(item => !item.checked))

       // 4。普通遍历
       /*   for(let item of this.$store.state.cartList) { */
       /*     if(!item.checked){ */
       /*       return false */
       /*     } */
       /*   } */
       /*   return true */
     },   
   },
   methods:{
     checkClick() {
       if(this.isSellectAll) {
         // 全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
       } else {
         // 部分或全部不选中
         this.$store.state.cartList.forEach(item => item.checked = true)
       }
     }
   }
}
</script>

<style scoped>
  .bottom-bar {
     height: 40px;
     background-color: #eee;
     position: fixed;
     bottom:49px;
     display: flex;
  }

  .price{
    font-size: 16px;
     margin-top: 11px;
     margin-left: 10px;
  }

  .content{
     display: flex;
     align-items: center;
     margin-left: 10px;
  }

   .check-all{
      width: 20px;
      height: 20px;
      margin-right: 5px;
   }

   .calculate{
     width: 100px;
     height: 40px;
     color: #ffff;
     line-height: 40px;
     margin-left: 80px;
     background-color: orange;
   }
</style>