<template>
  <div class="cell" @click="clickCell(leftTitle)">
    <div class="cell-left" :style="{color: leftTitleColor}">
      <i :class="leftIcon"></i>
      <span v-show="leftTitle">{{leftTitle}}</span>
    </div>
    <div class="cell-right" :style="{color: rightTitleColor}">
      <span  v-show="rightTitle" style="font-size: 13px;">{{rightTitle}}</span>
      <i class="iconfont icon-jiantouyou" v-show="isShowRightArrow"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SettingCell",
    props: {
      leftTitle: {type: String, default: ''},
      leftIcon: {type: String, default: ''},
      rightTitle: {type: String, default: ''},
      leftTitleColor:{type: String, default: '#333'},
      rightTitleColor:{type: String, default: '#666'},
      isShowRightArrow:{type: Boolean, default: true},
      clickCell: {
         type: Function,
         default: function () {}
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .cell
    height 44px
    background-color #fff
    display flex
    justify-content space-between
    align-items center
    padding 0 10px
    border-bottom 1px solid #ececec
    font-size 14px
    color #dedede
    .cell-left,
    .cell-right
      display flex
      align-items center
      i
        margin-right 5px
</style>

