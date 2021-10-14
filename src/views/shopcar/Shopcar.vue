<template>
  <div id="cart">
     <!-- 导航 -->
     <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
     </nav-bar>

     <!-- 商品的列表 -->
      <cart-list class="cart-list" :cartList="cartList"></cart-list>

     <!-- 底部汇总 -->
     <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
    
  import NavBar from '../../components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

export default {
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },


    computed:{
      cartLength() {
        console.log(this.$store.state.cartList.length);
        return this.$store.state.cartList.length
      },
      cartList() {
        console.log(this.$store.state.cartList);
         return this.$store.state.cartList
      }
    }
}
</script>

<style scoped>
   .nav-bar {
      background-color: var(--color-tint);
      color:white;
      font-weight: 700;
   }
</style>