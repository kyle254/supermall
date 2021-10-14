<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <tab-control   
    :titles="['流行','新款','精选']" 
    @tabclick="tabclick"
    ref="tabControl1"
    class="tab-control"
    v-show="isTabfixed">
   </tab-control>
   <scroll class="content" 
           ref="scroll" 
           :probe-type="3" 
           :pull-up-load="true"
           @scroll="contentScroll"
           @pullingUp="loadMore">
     <home-swiper :banners = "banners"  @swiperImageLoad="swiperImageLoad"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view></feature-view>
     <tab-control   
      :titles="['流行','新款','精选']" 
      @tabclick="tabclick"
      ref="tabControl2">
      </tab-control>
     <good-list :goods="showgoods"></good-list>
   </scroll>
    
     <!-- 利用.native属性可以直接监听组件,将一个vue组件转化为一个普通的HTML标签 -->
    <back-top @click.native ="backClick" v-show="isShowBackTop"></back-top>
 </div>  
</template>

<script>

 
  import HomeSwiper from './childeComps/HomeSwiper'
  import RecommendView from './childeComps/RecommendView'
  import FeatureView from './childeComps/FeatureView'

  import NavBar from '../../components/common/navbar/NavBar'
  import TabControl from '../../components/content/tabControl/TabControl'
  import GoodList from '../../components/content/goods/GoodList'
  import Scroll from '../../components/common/scroll/Scroll'
  import BackTop from '../../components/content/backtop/BackTop'
 

  import { getHomeMultidata,getHomeGoods} from '../../network/home'
  import {debounce} from '../../common/utils'


  export default {
    components:{
    NavBar,
    HomeSwiper,  
    RecommendView,
    FeatureView,
    TabControl,
    getHomeMultidata,  
    getHomeGoods,
    GoodList,
    Scroll,
    BackTop,
    debounce
 },

  data() {
   return{  
       banners:[],
       recommends:[],
       goods:{
          'pop': {page:0, list: []},
          'new': {page:0, list: []},
          'sell': {page:0, list: []}
       },
       currentType:'pop',
       isShowBackTop:false,
       tabOffsetTop: 0,
       saveY:0,
       isTabfixed:false
   }
 },

  activated() {
     this.$refs.scroll.scrollTo(0, this.saveY, 0)
     this.$refs.scroll.refresh()
  },

  deactivated() {
    // 1.离开页面时。记录位置
     this.saveY = this.$refs.scroll.getCurrentY()
    
    // 2.取消全局事件的监听
     //this.$bus.$off()
  },

  computed:{
    showgoods() {
       return this.goods[this.currentType].list
    }
  },
  
   created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
   },
   
   mounted() {
   // 1.图片加载完成的时间监听
   const refresh = debounce(this.$refs.scroll.refresh, 50)
   this.$bus.$on('itmeImageLoad', () => {
         refresh()
     })
   }, 

  methods:{
    //事件监听的相关方法
    tabclick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
           this.currentType = 'new'
           break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 让两个tabControl的currentIndex保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
     this.$refs.scroll.scrollTo(0,0,300)
    },

    contentScroll(position) {
      // 1.判断BcakTop的显示
      this.isShowBackTop = (-position.y) > 1000

      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabfixed = (-position.y) > this.tabOffsetTop
       
    },

    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    
     // 2.获取tabcortral的offsettop
     // 所有组价都有一个属性$el,用户获取组件的元素的
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求的相关方法
      // 去请求
    getHomeMultidata() {
     getHomeMultidata().then(res => {
     //console.log(res);
     this.banners = res.data.data.banner.list;
     this.recommends = res.data.data.recommend.list;
    })
  },
    
    getHomeGoods(type){
       const page = this.goods[type].page + 1
       getHomeGoods(type,page).then(res => {
       //console.log(res);
       this.goods[type].list.push(...res.data.data.list)
       this.goods[type].page += 1
       
      //  数据第一请求完成后，调用finishPullUp()，实现多次上拉加载
        this.$refs.scroll.finishPullUp()
       })
    }


 }
}
</script>

<style scoped>
   
   #home{
      position: relative;
      /* vh,vw 视图的高度和宽度 */
      height: 100vh;
   }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    
    /* 在使用浏览器原生滚动时，为了使导航不一起跟随滚动 */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .tab-control{
    position: relative;
    margin-top: 44px;
    z-index: 9;
  }

 /* 方法1 */
  .content{
     position: absolute;
     /* overflow: hidden; */
     top:44px;
     bottom: 49px;
     left: 0;
     right: 0;
  }


/* 方法2 */
/*.content{
  height:calc(100% - 50px);
  overflow: hidden;
  margin-top: 44px;
}*/  
</style>