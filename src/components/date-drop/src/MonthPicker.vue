<template>
  <div :class="[{ 'date-drop-month-picker-full': type === 'full' }, 'date-drop-month-picker']">
    <div @click="!minMonth?onChange('prev'):null" class="month-icon-click left">
      <span v-show="!minMonth"><Icon symbol="arrowRight" className="month-icon"></Icon></span>
    </div>
    <div class="month-text">
      <transition :name="animationType=='prev'?'change-prev':'change-next'" >
        <span :key="ddMonth">{{ddMonth}}</span>
      </transition>
    </div>
    <div @click="!maxMonth?onChange('next'):null" class="month-icon-click right">
      <span v-show="!maxMonth"><Icon symbol="arrowLeft" className="month-icon"></Icon></span>
    </div>
    <div class="week-container">
      <template v-for="week in ['日','一','二','三','四','五','六']">
        <span>{{week}}</span>
      </template>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon';
  export default {
    components:{
      Icon
    },
    props:{
      ddMonth: null,
      type: {
        type: String,
        default: 'small'
      },
      maxMonth:null,
      minMonth:null,
    },
    data(){
      return {
      	animationType:'prev'
      }
    },
    methods:{
      onChange(data) {
      	this.animationType = data;
        this.$emit('onChange',data)
      }
    }
  }
</script>

<style scoped lang="less">
  .date-drop-month-picker{
    background: #FF2D34;
    line-height:55px;
    height: 55px;
    width: 100%;
    border-radius: 5px 5px 0 0;
    position: relative;
    transition: all .8s cubic-bezier(1,-.55,.2,1.37);
    &.date-drop-month-picker-full{
      height: 76px;
    }
    .month-icon-click{
      width: 40px;
      height: 55px;
      position: absolute;
      top:0;
      cursor: pointer;
      .month-icon{
        display: none;
        width: 14px;
        height:14px;
        fill: #fff;
        margin: 20px auto 0 auto;
      }
      &.left{
        left:0;
      }
      &.right{
        right: 0;
      }
    }
    &:hover .month-icon-click .month-icon{
      display: block;
    }
    .month-text{
      font-size: 20px;
      text-align: center;
      width: 60px;
      margin: 0 auto;
      height:55px;
      box-sizing: border-box;
      color: #fff;
      overflow: hidden;
      position: relative;
      span{
        display: inline-block;
        position: absolute;
        width: 100%;
        left: 0 ;
      }
    }
    .week-container{
      line-height: 20px;
      padding: 0 7.5px;
      box-sizing: border-box;
      margin-top: -5px;
      span{
        width: 14%;
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: #fff;
      }
    }
  }
</style>
