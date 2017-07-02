<template>
  <div :class="[{ 'date-drop-year-picker-full': type === 'full' }, 'date-drop-year-picker']">
    <div @click="!minYear?onChange('prev'):null" class="year-icon-click left">
      <span v-show="!minYear"><Icon symbol="arrowRight" className="year-icon"></Icon></span>
    </div>
      <div class="year-text">
        <transition :name="animationType=='prev'?'change-prev':'change-next'" >
          <span :key="ddYear">{{ddYear}}</span>
        </transition>
      </div>
    <div @click="!maxYear?onChange('next'):null" class="year-icon-click right">
      <span v-show="!maxYear"><Icon symbol="arrowLeft" className="year-icon"></Icon></span>
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
      ddYear: {
        type:Number,
        default: ''
      },
      type: {
        type: String,
        default: 'small'
      },
      maxYear:null,
      minYear:null,
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
  .date-drop-year-picker{
    height: 35px;
    line-height:35px;
    width: 100%;
    position: relative;
    transition: all .8s cubic-bezier(1,-.55,.2,1.37);
    .year-icon-click{
      width: 50px;
      height: 100%;
      position: absolute;
      top:0;
      cursor: pointer;
      .year-icon{
        display: none;
        width: 14px;
        height:14px;
        fill: #B7B7B7;
        margin: 10px auto 0 auto;
      }
      &.left{
        left:0;
      }
      &.right{
        right: 0;
      }
    }
    &:hover .year-icon-click .year-icon{
      display: block;
    }
    .year-text{
      font-size: 20px;
      text-align: center;
      width: 45px;
      margin: 0 auto;
      height:100%;
      box-sizing: border-box;
      color: #4D4D4D;
      overflow: hidden;
      position: relative;
      span{
        display: inline-block;
        position: absolute;
        width: 100%;
        left: 0 ;
      }
    }
    &.date-drop-year-picker-full{
      height: 45px;
      line-height:45px;
      .year-icon-click {
        .year-icon {
          margin: 15px auto 0 auto;
        }
      }
    }
  }
</style>
