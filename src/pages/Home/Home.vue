<template>
  <div class="homebox">
    <ly-tab
    v-model="selectedId"
    :items="items"
    :options="options"
    @change='HandleChange'
    class="topTabs"
    ></ly-tab>
    <div class="homeScroll">
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name:"Home",
  data(){
    return{
      items:[
        {label:'热门'},
        {label:'女装'},
        {label:'鞋包'},
        {label:'母婴'},
        {label:'百货'},
        {label:'男装'},
        {label:'手机'},
        {label:'电器'}
        ],
      selectedId:0,
      options:{
        activeColor:'#e9232c'
      },
      subRouterUrl:[
        '/home/hot',
        '/home/dres',
        '/home/shoebag',
        '/home/muyin',
        '/home/department',
        '/home/nanzhuang',
        '/home/phone',
        '/home/dianqi'
      ]
      
    }
  },
   created() {
      console.log(this.$route)
    },
    methods: {
      HandleChange(item,index){
        this.$router.replace(this.subRouterUrl[index])
      }
    },
}
</script>

<style lang='scss' scoped>  
  .homebox{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    .topTabs{
      background: #ffffff;
    }
    .homeScroll{
      flex: 1;
      overflow-x: hidden;
    }
  }
</style>
