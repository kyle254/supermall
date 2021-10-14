<template>
  <div id="detail">
      <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" 
      ref="scroll" 
      @scroll="contentScroll"
      :probe-type="3"
      >
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info  ref="params" :param-info="goodsParam"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <good-list ref="recommend" :goods="recommends"></good-list>
      </scroll>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
      <back-top @click.native ="backClick" v-show="isShowBackTop"></back-top>   
  </div>
</template>

<script>
    import DetailNavBar from './chilidComps/DdtailNavBar'  
    import DetailSwiper from './chilidComps/DetailSwiper'
    import DetailBaseInfo from './chilidComps/DetailBaseInfo'
    import DetailShopInfo from './chilidComps/DetailShopInfo'
    import DetailGoodsInfo from './chilidComps/DetailGoodsInfo'
    import DetailParamInfo from './chilidComps/DetailParamInfo'
    import DetailCommentInfo from './chilidComps/DetailCommendInfo'
    import DetailBottomBar  from './chilidComps/DetailBottomBar'
    import BackTop from '../../components/content/backtop/BackTop'
    

    import Scroll from '../../components/common/scroll/Scroll'
    import GoodList from '../../components/content/goods/GoodList'

    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '../../network/detail'
    import {debounce} from '../../common/utils'
    

    export default {
      name:'Detail',
      components:{
        DetailNavBar,
        getDetail,
        DetailSwiper,
        Goods,
        DetailBaseInfo,
        DetailShopInfo,
        DetailParamInfo,
        Shop,
        Scroll,
        DetailGoodsInfo,
        GoodsParam,
        DetailCommentInfo,
        GoodList,
        debounce,
        DetailBottomBar,
        BackTop
      },

      data(){
        return {
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          goodsParam:{},
          commentInfo:{},
          recommends:[],
          themeTopYs:[],
          currentIndex: 0,
          isShowBackTop:false,
        }
      },

      created() {
         // 1.保存传入的iid
         this.iid = this.$route.params.iid

         // 2.根据iid请求详情数据
         getDetail(this.iid).then(res => {
            // 1.获取顶部轮播数据
            console.log(res);
            const data = res.data.result
            this.topImages = data.itemInfo.topImages


            // 2.获取商品信息
             this.goods = new Goods(data.itemInfo, data.columns,data.shopInfo.services)

            // 3. 创建店铺信息
            this.shop = new Shop(data.shopInfo)

            // 4.保存商品详情数据
            this.detailInfo = data.detailInfo

            // 5.获取参数信息
            this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            // 6.取出评论的信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
            
            this.$nextTick(() => {
              // 根据最新的数据，对应的DOM是已经被渲染出来了
              // 但是图片还是没有加载完(目前获取offsetTop是不包含其中的图片的)
              // .offsetTop值不对的时候，都是因为图片的问题
              // this.themeTopYs = []
              // this.themeTopYs.push(0)
              // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
              // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
              // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
              // console.log(this.themeTopYs);
            })
         })

          // 3.请求推荐数据
          getRecommend().then(res => {
            //console.log(res);
           this.recommends = res.data.data.list
         })
      },

      methods:{
        imageLoad() {
          this.$refs.scroll.refresh()
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // 引入一个最大值
          this.themeTopYs.push(Number.MAX_VALUE)
          console.log(this.themeTopYs);
        },
        
        titleClick(index) {
          // console.log(index);
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 500)
        },

        contentScroll(position) {

          // 1.滚动页面与导航选项卡匹配
          const positionY = -position.y
          let length = this.themeTopYs.length
          for(let i = 0; i < length; i++){
            let ipos = this.themeTopYs[i]
            if(positionY >= ipos && positionY < this.themeTopYs[i + 1])
            if (this.currentIndex !== i){
             this.currentIndex = i
             this.$refs.nav.currentIndex = this.currentIndex
             }
          }

          // 2。是否显示回到顶部
          this.isShowBackTop = (-position.y) > 1000
        },

        backClick() {
        this.$refs.scroll.scrollTo(0,0,300) 
        },
        
        addToCart() {
          //  1. 展示需要加入购物车里面的商品信息
              const product = {}
              product.image = this.topImages[0];
              product.title = this.goods.title;
              product.desc = this.goods.desc;
              product.price = this.goods.realPrice;
              product.iid = this.iid;

          // 2.将商品添加到购物车里
               //this.$store.commit('addCart',product)
              this.$store.dispatch('addCart',product)  

          // 3.vant组件库 添加toast组件
              this.$toast({
              message: '添加1件商品',
              position: 'center'
             });
      }    
    }
  }
</script>

<style scoped>
   #detail {
      position: relative;
      z-index: 9;
      background-color: #fff;
      height: 100vh;
   }

   .content {
     height: calc(100% - 44px - 52px);
     overflow: hidden;
   }
</style>