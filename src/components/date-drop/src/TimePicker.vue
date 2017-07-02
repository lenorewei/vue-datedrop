<template>
  <div class="date-drop-time-picker-container">
    <div class='date-drop-time-picker'>
      <div class="chose-container">
        <span @click="onHourChange('prev')" class="chose-icon-top" v-show="!minHour">
        </span>
        <div class="hour time-text">
          {{ddHour<10?'0'+ddHour:ddHour}}
          </div>
          <span @click="onHourChange('next')" class="chose-icon-bottom" v-show="!maxHour">
          </span>
      </div>
      <div class="time-interval">:</div>
      <div class="chose-container">
        <span @click="onMinChange('prev')" class="chose-icon-top" v-show="!minMin">
        </span>
        <div class="min time-text">
          {{ddMin<10?'0'+ddMin:ddMin}}
        </div>
        <span @click="onMinChange('next')" class="chose-icon-bottom" v-show="!maxMin">
        </span>
      </div>
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
      ddHour: {
        type:[Number],
        default: 0
      },
      ddMin: {
        type:[Number],
        default: 0
      },
      maxHour:null,
      minHour:null,
      maxMin:null,
      minMin:null,
    },
    methods:{
      onHourChange(data) {
        this.$emit('onHourChange',data)
      },
      onMinChange(data) {
        this.$emit('onMinChange',data)
      },
    }
  }
</script>
<style scoped lang="less">
  .date-drop-time-picker-container{
    border-bottom: 1px solid #F0F0F0;
    background: #F7F7F7;
    height: 79px;
    width: 100%;
  }
  .date-drop-time-picker {
    width: 140px;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
    .chose-container,
    .time-interval{
      display: inline-block;
      height: 100%;
      line-height: 79px;
      font-size: 24px;
      text-align: center;
    }
    .chose-container{
      width: 40px;
      color: #4D4D4D;
      position: relative;
      .chose-icon-top,
      .chose-icon-bottom{
        width: 0;
        height: 0;
        border-style: solid dashed;
        position: absolute;
        left: 10px;
        cursor: pointer;
      }
      .chose-icon-top{
        border-width: 0 10px 10px;
        border-color:  transparent transparent #E1E1E1 transparent;
        top: 10px;
      }
      .chose-icon-bottom{
        border-width: 10px 10px 0;
        border-color: #E1E1E1 transparent transparent transparent;
        bottom: 10px;
      }
    }
    .time-interval{
      width: 18px;
    }
  }
</style>
